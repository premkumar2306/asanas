import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { StudioInfo } from "../types/studio";

export async function saveStudioInfoToFirestore(studioInfo: StudioInfo, id: string = "default") {
  const studioRef = doc(db, "studioDetails", id);
  try {
    await setDoc(studioRef, studioInfo, { merge: true });
  } catch (validationError: any) {
    console.error("Firestore error:", validationError);
  }
}

export async function getStudioInfoFromFirestore(id: string = "default"): Promise<StudioInfo | null> {
  const studioRef = doc(db, "studioDetails", id);
  const docSnap = await getDoc(studioRef);
  return docSnap.exists() ? (docSnap.data() as StudioInfo) : null;
}