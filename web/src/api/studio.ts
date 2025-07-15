import { doc, setDoc, getDoc, collection, addDoc, getDocs, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";
import { StudioInfo } from "../types/studio";
import { PlanData } from "../components/PlansPricing/types";

export async function saveStudioInfoToFirestore(studioInfo: StudioInfo, id: string = "default") {
  const studioRef = doc(db, "studioDetails", id);
  try {
    await setDoc(studioRef, studioInfo, { merge: true });
    console.log("Studio info saved successfully:", studioInfo);
  } catch (validationError: any) {
    console.error("Firestore error:", validationError);
  }
}

export async function getStudioInfoFromFirestore(id: string = "default"): Promise<StudioInfo | null> {
  const studioRef = doc(db, "studioDetails", id);
  const docSnap = await getDoc(studioRef);
  return docSnap.exists() ? (docSnap.data() as StudioInfo) : null;
}

export async function savePlanToFirestore(plan: PlanData) {
  const plansRef = collection(db, "studioPlans");
  if (plan.id) {
    // Use id as string for Firestore doc id
    const planDoc = doc(plansRef, String(plan.id));
    await setDoc(planDoc, plan, { merge: true });
  } else {
    await addDoc(plansRef, plan);
  }
}

export async function getPlansFromFirestore(): Promise<PlanData[]> {
  const plansRef = collection(db, "studioPlans");
  const snapshot = await getDocs(plansRef);
  return snapshot.docs.map(doc => doc.data() as PlanData);
}

export async function deletePlanFromFirestore(planId: number) {
  const plansRef = collection(db, "studioPlans");
  const planDoc = doc(plansRef, String(planId));
  await deleteDoc(planDoc);
}

export async function updatePlanInFirestore(plan: PlanData) {
  const plansRef = collection(db, "studioPlans");
  const planDoc = doc(plansRef, String(plan.id));
  await updateDoc(planDoc, plan as any);
}