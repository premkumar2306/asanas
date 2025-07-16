import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { useTranslation } from "react-i18next";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {
  IoTimeOutline,
  IoSearch,
  IoTrash,
  IoWarning,
  IoSave,
} from "react-icons/io5";
import { Button } from "../components/Common/Button";

interface Pose {
  id: number;
  name: string;
  sanskrit: string;
  difficulty: number;
  description: string;
  category: string;
  tags: string[];
}

interface FlowPose extends Pose {
  duration: number;
  notes: string;
}

interface ValidationErrors {
  flowName?: string;
  flowDescription?: string;
  poses?: string;
  duration?: string;
}

function FlowBuilder() {
  const { t } = useTranslation();
  const [poses, setPoses] = useState<Pose[]>([]);
  const [selectedPoses, setSelectedPoses] = useState<FlowPose[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDifficulty, setFilterDifficulty] = useState<number>(0);
  const [filterCategory, setFilterCategory] = useState<string>("");
  const [flowName, setFlowName] = useState("");
  const [flowDescription, setFlowDescription] = useState("");
  const [totalDuration, setTotalDuration] = useState(0);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSaving, setIsSaving] = useState(false);

  // Validation constants
  const CONSTANTS = {
    MIN_FLOW_NAME_LENGTH: 3,
    MAX_FLOW_NAME_LENGTH: 50,
    MAX_DESCRIPTION_LENGTH: 500,
    MIN_POSES: 2,
    MAX_POSES: 50,
    MIN_POSE_DURATION: 5,
    MAX_POSE_DURATION: 300, // 5 minutes max per pose
    MAX_TOTAL_DURATION: 7200, // 2 hours max total
  };

  const validateFlow = (): ValidationErrors => {
    const newErrors: ValidationErrors = {};

    // Validate flow name
    if (!flowName.trim()) {
      newErrors.flowName = "Flow name is required";
    } else if (flowName.length < CONSTANTS.MIN_FLOW_NAME_LENGTH) {
      newErrors.flowName = `Flow name must be at least ${CONSTANTS.MIN_FLOW_NAME_LENGTH} characters`;
    } else if (flowName.length > CONSTANTS.MAX_FLOW_NAME_LENGTH) {
      newErrors.flowName = `Flow name cannot exceed ${CONSTANTS.MAX_FLOW_NAME_LENGTH} characters`;
    }

    // Validate description (optional but with max length)
    if (flowDescription.length > CONSTANTS.MAX_DESCRIPTION_LENGTH) {
      newErrors.flowDescription = `Description cannot exceed ${CONSTANTS.MAX_DESCRIPTION_LENGTH} characters`;
    }

    // Validate poses
    if (selectedPoses.length < CONSTANTS.MIN_POSES) {
      newErrors.poses = `Flow must contain at least ${CONSTANTS.MIN_POSES} poses`;
    } else if (selectedPoses.length > CONSTANTS.MAX_POSES) {
      newErrors.poses = `Flow cannot exceed ${CONSTANTS.MAX_POSES} poses`;
    }

    // Validate durations
    const invalidDurations = selectedPoses.some(
      (pose) =>
        pose.duration < CONSTANTS.MIN_POSE_DURATION ||
        pose.duration > CONSTANTS.MAX_POSE_DURATION,
    );
    if (invalidDurations) {
      newErrors.duration = `Each pose duration must be between ${CONSTANTS.MIN_POSE_DURATION} and ${CONSTANTS.MAX_POSE_DURATION} seconds`;
    }

    if (totalDuration > CONSTANTS.MAX_TOTAL_DURATION) {
      newErrors.duration = `Total flow duration cannot exceed ${CONSTANTS.MAX_TOTAL_DURATION / 60} minutes`;
    }

    return newErrors;
  };

  useEffect(() => {
    fetch("/data/poses.json")
      .then((res) => res.json())
      .then((data) => setPoses(data.poses));
  }, []);

  useEffect(() => {
    const total = selectedPoses.reduce((acc, pose) => acc + pose.duration, 0);
    setTotalDuration(total);
  }, [selectedPoses]);

  const handleAddPose = (pose: Pose) => {
    const flowPose: FlowPose = {
      ...pose,
      duration: 30, // Default 30 seconds
      notes: "",
    };
    setSelectedPoses([...selectedPoses, flowPose]);
  };

  const handleUpdatePoseDuration = (index: number, duration: number) => {
    const updatedPoses = [...selectedPoses];
    // Ensure duration is within bounds
    const validDuration = Math.min(
      Math.max(duration, CONSTANTS.MIN_POSE_DURATION),
      CONSTANTS.MAX_POSE_DURATION,
    );
    updatedPoses[index].duration = validDuration;
    setSelectedPoses(updatedPoses);
  };

  const handleUpdatePoseNotes = (index: number, notes: string) => {
    const updatedPoses = [...selectedPoses];
    updatedPoses[index].notes = notes;
    setSelectedPoses(updatedPoses);
  };

  const handleRemovePose = (index: number) => {
    const updatedPoses = selectedPoses.filter((_, idx) => idx !== index);
    setSelectedPoses(updatedPoses);
  };

  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(selectedPoses);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setSelectedPoses(items);
  };

  const filteredPoses = poses.filter((pose) => {
    const matchesSearch =
      pose.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pose.sanskrit.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty =
      filterDifficulty === 0 || pose.difficulty === filterDifficulty;
    const matchesCategory = !filterCategory || pose.category === filterCategory;
    return matchesSearch && matchesDifficulty && matchesCategory;
  });

  const saveFlow = async () => {
    const validationErrors = validateFlow();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setIsSaving(true);
    try {
      const flowData = {
        name: flowName.trim(),
        description: flowDescription.trim(),
        poseSequence: selectedPoses,
        totalDuration,
        createdAt: new Date(),
        difficulty: Math.max(...selectedPoses.map((pose) => pose.difficulty)),
        posesCount: selectedPoses.length,
        lastModified: new Date(),
      };

      await addDoc(collection(db, "flows"), flowData);

      // Clear form after successful save
      setFlowName("");
      setFlowDescription("");
      setSelectedPoses([]);
      setErrors({});

      alert("Flow saved successfully!");
    } catch (error) {
      console.error("Error saving flow:", error);
      setErrors({
        ...errors,
        submit: "Failed to save flow. Please try again.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">{t("flowBuilder")}</h2>

      {/* Flow Details with Validation */}
      <div className="mb-6">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Flow Name *"
            className={`w-full mb-1 p-2 border rounded ${
              errors.flowName ? "border-red-500" : ""
            }`}
            value={flowName}
            onChange={(e) => setFlowName(e.target.value)}
          />
          {errors.flowName && (
            <div className="text-red-500 text-sm flex items-center">
              <IoWarning className="mr-1" />
              {errors.flowName}
            </div>
          )}
        </div>

        <div className="mb-4">
          <textarea
            placeholder="Flow Description"
            className={`w-full p-2 border rounded ${
              errors.flowDescription ? "border-red-500" : ""
            }`}
            value={flowDescription}
            onChange={(e) => setFlowDescription(e.target.value)}
          />
          {errors.flowDescription && (
            <div className="text-red-500 text-sm flex items-center">
              <IoWarning className="mr-1" />
              {errors.flowDescription}
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-4">
        {/* Available Poses Panel */}
        <div className="w-1/2 bg-white rounded-lg shadow p-4">
          <h3 className="text-xl font-semibold mb-4">Available Poses</h3>

          {/* Filters */}
          <div className="mb-4 space-y-2">
            <div className="flex items-center bg-gray-100 rounded-lg p-2">
              <IoSearch className="text-gray-500 mr-2" />
              <input
                type="text"
                placeholder="Search poses..."
                className="bg-transparent w-full outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <select
              className="w-full p-2 border rounded"
              value={filterDifficulty}
              onChange={(e) => setFilterDifficulty(Number(e.target.value))}
            >
              <option value={0}>All Difficulties</option>
              <option value={1}>Beginner</option>
              <option value={2}>Intermediate</option>
              <option value={3}>Advanced</option>
            </select>

            <select
              className="w-full p-2 border rounded"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              {Array.from(new Set(poses.map((pose) => pose.category))).map(
                (category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ),
              )}
            </select>
          </div>

          {/* Pose List */}
          <div className="h-[600px] overflow-y-auto">
            {filteredPoses.map((pose) => (
              <div
                key={pose.id}
                onClick={() => handleAddPose(pose)}
                className="cursor-pointer border rounded p-3 mb-2 hover:bg-gray-50"
              >
                <div className="font-semibold">{pose.name}</div>
                <div className="text-sm text-gray-600">{pose.sanskrit}</div>
                <div className="text-xs text-gray-500">
                  Difficulty: {"⭐".repeat(pose.difficulty)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Selected Flow Panel */}
        <div className="w-1/2 bg-white rounded-lg shadow p-4">
          <h3 className="text-xl font-semibold mb-4">
            Selected Flow
            <span className="text-sm font-normal text-gray-500 ml-2">
              Total Duration: {Math.floor(totalDuration / 60)}m{" "}
              {totalDuration % 60}s
            </span>
          </h3>

          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="selected-poses">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="space-y-2"
                >
                  {selectedPoses.map((pose, index) => (
                    <Draggable
                      key={`${pose.id}-${index}`}
                      draggableId={`${pose.id}-${index}`}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="border rounded p-3 bg-white"
                        >
                          <div className="flex justify-between items-center mb-2">
                            <div className="font-semibold">{pose.name}</div>
                            <button
                              onClick={() => handleRemovePose(index)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <IoTrash />
                            </button>
                          </div>

                          <div className="flex items-center gap-2 mb-2">
                            <IoTimeOutline />
                            <input
                              type="number"
                              min="5"
                              step="5"
                              value={pose.duration}
                              onChange={(e) =>
                                handleUpdatePoseDuration(
                                  index,
                                  Number(e.target.value),
                                )
                              }
                              className="w-20 p-1 border rounded"
                            />
                            <span className="text-sm text-gray-500">
                              seconds
                            </span>
                          </div>

                          <textarea
                            placeholder="Add notes for this pose..."
                            value={pose.notes}
                            onChange={(e) =>
                              handleUpdatePoseNotes(index, e.target.value)
                            }
                            className="w-full p-2 text-sm border rounded"
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>

          {selectedPoses.length > 0 && (
            <Button
              onClick={saveFlow}
              isLoading={isSaving}
              fullWidth
              variant="primary"
              icon={IoSave}
            >
              {isSaving ? "Saving..." : "Save Flow"}
            </Button>
          )}

          {errors.poses && (
            <div className="text-red-500 text-sm mt-2 flex items-center">
              <IoWarning className="mr-1" />
              {errors.poses}
            </div>
          )}

          {errors.duration && (
            <div className="text-red-500 text-sm mt-2 flex items-center">
              <IoWarning className="mr-1" />
              {errors.duration}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FlowBuilder;
