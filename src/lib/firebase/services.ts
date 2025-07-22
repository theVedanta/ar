import {
    collection,
    doc,
    getDoc,
    getDocs,
    addDoc,
    setDoc,
    updateDoc,
    deleteDoc,
    query,
    where,
    orderBy,
    limit,
    Timestamp,
    serverTimestamp,
} from "firebase/firestore";
import db from "@/app/db";
import {
    User,
    Student,
    Scribe,
    Admin,
    SuperAdmin,
    ScribeRequest,
    AdminRequest,
    Match,
    Feedback,
    COLLECTIONS,
    RequestStatus,
    MatchStatus,
} from "./types";

// User Services
export const createUser = async (
    userData: Omit<User, "createdAt" | "updatedAt">
) => {
    try {
        const docRef = doc(db, COLLECTIONS.USERS, userData.id);
        await setDoc(docRef, {
            ...userData,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
        });
        return userData.id;
    } catch (error) {
        console.error("Error creating user:", error);
        throw error;
    }
};

export const getUserById = async (userId: string): Promise<User | null> => {
    try {
        const docRef = doc(db, COLLECTIONS.USERS, userId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() } as User;
        }
        return null;
    } catch (error) {
        console.error("Error getting user:", error);
        throw error;
    }
};

export const updateUser = async (userId: string, updateData: Partial<User>) => {
    try {
        const docRef = doc(db, COLLECTIONS.USERS, userId);
        await updateDoc(docRef, {
            ...updateData,
            updatedAt: serverTimestamp(),
        });
    } catch (error) {
        console.error("Error updating user:", error);
        throw error;
    }
};

// Student Services
export const createStudent = async (
    studentData: Omit<Student, "createdAt" | "updatedAt">
) => {
    try {
        const docRef = doc(db, COLLECTIONS.STUDENTS, studentData.id);
        await setDoc(docRef, {
            ...studentData,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
        });
        return studentData.id;
    } catch (error) {
        console.error("Error creating student:", error);
        throw error;
    }
};

export const getStudentById = async (
    studentId: string
): Promise<Student | null> => {
    try {
        const docRef = doc(db, COLLECTIONS.STUDENTS, studentId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() } as Student;
        }
        return null;
    } catch (error) {
        console.error("Error getting student:", error);
        throw error;
    }
};

// Scribe Services
export const createScribe = async (
    scribeData: Omit<Scribe, "createdAt" | "updatedAt">
) => {
    try {
        const docRef = doc(db, COLLECTIONS.SCRIBES, scribeData.id);
        await setDoc(docRef, {
            ...scribeData,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
        });
        return scribeData.id;
    } catch (error) {
        console.error("Error creating scribe:", error);
        throw error;
    }
};

export const getScribeById = async (
    scribeId: string
): Promise<Scribe | null> => {
    try {
        const docRef = doc(db, COLLECTIONS.SCRIBES, scribeId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() } as Scribe;
        }
        return null;
    } catch (error) {
        console.error("Error getting scribe:", error);
        throw error;
    }
};

export const getAvailableScribes = async (
    subjects?: string[],
    location?: string
) => {
    try {
        let q = query(
            collection(db, COLLECTIONS.SCRIBES),
            where("availability", "==", "available"),
            where("isActive", "==", true)
        );

        if (location) {
            q = query(q, where("location", "==", location));
        }

        const querySnapshot = await getDocs(q);
        const scribes = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        })) as Scribe[];

        // Filter by subjects if provided
        if (subjects && subjects.length > 0) {
            return scribes.filter((scribe) =>
                subjects.some((subject) => scribe.subjects.includes(subject))
            );
        }

        return scribes;
    } catch (error) {
        console.error("Error getting available scribes:", error);
        throw error;
    }
};

// Admin Services
export const createAdmin = async (
    adminData: Omit<Admin, "createdAt" | "updatedAt">
) => {
    try {
        const docRef = doc(db, COLLECTIONS.ADMINS, adminData.id);
        await setDoc(docRef, {
            ...adminData,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
        });
        return adminData.id;
    } catch (error) {
        console.error("Error creating admin:", error);
        throw error;
    }
};

export const getAdminById = async (adminId: string): Promise<Admin | null> => {
    try {
        const docRef = doc(db, COLLECTIONS.ADMINS, adminId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() } as Admin;
        }
        return null;
    } catch (error) {
        console.error("Error getting admin:", error);
        throw error;
    }
};

// Scribe Request Services
export const createScribeRequest = async (
    requestData: Omit<ScribeRequest, "id" | "createdAt" | "updatedAt">
) => {
    try {
        const docRef = await addDoc(
            collection(db, COLLECTIONS.SCRIBE_REQUESTS),
            {
                ...requestData,
                status: "pending",
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
            }
        );
        return docRef.id;
    } catch (error) {
        console.error("Error creating scribe request:", error);
        throw error;
    }
};

export const getScribeRequestById = async (
    requestId: string
): Promise<ScribeRequest | null> => {
    try {
        const docRef = doc(db, COLLECTIONS.SCRIBE_REQUESTS, requestId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() } as ScribeRequest;
        }
        return null;
    } catch (error) {
        console.error("Error getting scribe request:", error);
        throw error;
    }
};

export const getScribeRequestsByAdmin = async (adminId: string) => {
    try {
        const q = query(
            collection(db, COLLECTIONS.SCRIBE_REQUESTS),
            where("adminId", "==", adminId),
            orderBy("createdAt", "desc")
        );

        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        })) as ScribeRequest[];
    } catch (error) {
        console.error("Error getting scribe requests by admin:", error);
        throw error;
    }
};

export const getPendingScribeRequests = async () => {
    try {
        const q = query(
            collection(db, COLLECTIONS.SCRIBE_REQUESTS),
            where("status", "==", "pending"),
            orderBy("createdAt", "desc")
        );

        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        })) as ScribeRequest[];
    } catch (error) {
        console.error("Error getting pending scribe requests:", error);
        throw error;
    }
};

export const approveScribeRequest = async (
    requestId: string,
    approvedBy: string
) => {
    try {
        const docRef = doc(db, COLLECTIONS.SCRIBE_REQUESTS, requestId);
        await updateDoc(docRef, {
            status: "approved",
            approvedBy,
            approvedAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
        });
    } catch (error) {
        console.error("Error approving scribe request:", error);
        throw error;
    }
};

export const rejectScribeRequest = async (
    requestId: string,
    rejectedBy: string,
    rejectionReason: string
) => {
    try {
        const docRef = doc(db, COLLECTIONS.SCRIBE_REQUESTS, requestId);
        await updateDoc(docRef, {
            status: "rejected",
            rejectedBy,
            rejectedAt: serverTimestamp(),
            rejectionReason,
            updatedAt: serverTimestamp(),
        });
    } catch (error) {
        console.error("Error rejecting scribe request:", error);
        throw error;
    }
};

// Admin Request Services
export const createAdminRequest = async (
    requestData: Omit<AdminRequest, "id" | "requestedAt">
) => {
    try {
        const docRef = await addDoc(
            collection(db, COLLECTIONS.ADMIN_REQUESTS),
            {
                ...requestData,
                status: "pending",
                requestedAt: serverTimestamp(),
            }
        );
        return docRef.id;
    } catch (error) {
        console.error("Error creating admin request:", error);
        throw error;
    }
};

export const getPendingAdminRequests = async () => {
    try {
        const q = query(
            collection(db, COLLECTIONS.ADMIN_REQUESTS),
            where("status", "==", "pending"),
            orderBy("requestedAt", "desc")
        );

        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        })) as AdminRequest[];
    } catch (error) {
        console.error("Error getting pending admin requests:", error);
        throw error;
    }
};

export const approveAdminRequest = async (
    requestId: string,
    approvedBy: string
) => {
    try {
        const docRef = doc(db, COLLECTIONS.ADMIN_REQUESTS, requestId);
        await updateDoc(docRef, {
            status: "approved",
            approvedBy,
            approvedAt: serverTimestamp(),
        });

        // Also update the admin's approval status
        const request = await getDoc(docRef);
        if (request.exists()) {
            const adminRef = doc(db, COLLECTIONS.ADMINS, request.data().userId);
            await updateDoc(adminRef, {
                isApproved: true,
                approvedBy,
                approvedAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
            });
        }
    } catch (error) {
        console.error("Error approving admin request:", error);
        throw error;
    }
};

export const rejectAdminRequest = async (
    requestId: string,
    rejectedBy: string,
    rejectionReason: string
) => {
    try {
        const docRef = doc(db, COLLECTIONS.ADMIN_REQUESTS, requestId);
        await updateDoc(docRef, {
            status: "rejected",
            rejectedBy,
            rejectedAt: serverTimestamp(),
            rejectionReason,
        });
    } catch (error) {
        console.error("Error rejecting admin request:", error);
        throw error;
    }
};

export const getAdminRequestByUserId = async (
    userId: string
): Promise<AdminRequest | null> => {
    try {
        const q = query(
            collection(db, COLLECTIONS.ADMIN_REQUESTS),
            where("userId", "==", userId),
            orderBy("requestedAt", "desc"),
            limit(1)
        );

        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            const doc = querySnapshot.docs[0];
            return { id: doc.id, ...doc.data() } as AdminRequest;
        }
        return null;
    } catch (error) {
        console.error("Error getting admin request by user ID:", error);
        throw error;
    }
};

// Match Services
export const createMatch = async (
    matchData: Omit<Match, "id" | "createdAt">
) => {
    try {
        const docRef = await addDoc(collection(db, COLLECTIONS.MATCHES), {
            ...matchData,
            status: "matched",
            createdAt: serverTimestamp(),
        });
        return docRef.id;
    } catch (error) {
        console.error("Error creating match:", error);
        throw error;
    }
};

export const confirmMatch = async (matchId: string) => {
    try {
        const docRef = doc(db, COLLECTIONS.MATCHES, matchId);
        await updateDoc(docRef, {
            status: "confirmed",
            confirmedAt: serverTimestamp(),
        });
    } catch (error) {
        console.error("Error confirming match:", error);
        throw error;
    }
};

export const completeMatch = async (matchId: string) => {
    try {
        const docRef = doc(db, COLLECTIONS.MATCHES, matchId);
        await updateDoc(docRef, {
            status: "completed",
            completedAt: serverTimestamp(),
        });
    } catch (error) {
        console.error("Error completing match:", error);
        throw error;
    }
};

export const getMatchesByStudent = async (studentId: string) => {
    try {
        const q = query(
            collection(db, COLLECTIONS.MATCHES),
            where("studentId", "==", studentId),
            orderBy("createdAt", "desc")
        );

        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        })) as Match[];
    } catch (error) {
        console.error("Error getting matches by student:", error);
        throw error;
    }
};

export const getMatchesByScribe = async (scribeId: string) => {
    try {
        const q = query(
            collection(db, COLLECTIONS.MATCHES),
            where("scribeId", "==", scribeId),
            orderBy("createdAt", "desc")
        );

        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        })) as Match[];
    } catch (error) {
        console.error("Error getting matches by scribe:", error);
        throw error;
    }
};

// Feedback Services
export const createFeedback = async (
    feedbackData: Omit<Feedback, "id" | "createdAt">
) => {
    try {
        const docRef = await addDoc(collection(db, COLLECTIONS.FEEDBACK), {
            ...feedbackData,
            createdAt: serverTimestamp(),
        });

        // Update scribe rating
        await updateScribeRating(feedbackData.scribeId, feedbackData.rating);

        return docRef.id;
    } catch (error) {
        console.error("Error creating feedback:", error);
        throw error;
    }
};

const updateScribeRating = async (scribeId: string, newRating: number) => {
    try {
        const scribeRef = doc(db, COLLECTIONS.SCRIBES, scribeId);
        const scribeSnap = await getDoc(scribeRef);

        if (scribeSnap.exists()) {
            const scribeData = scribeSnap.data() as Scribe;
            const currentRating = scribeData.rating || 0;
            const totalRatings = scribeData.totalRatings || 0;

            const newTotalRatings = totalRatings + 1;
            const updatedRating =
                (currentRating * totalRatings + newRating) / newTotalRatings;

            await updateDoc(scribeRef, {
                rating: Math.round(updatedRating * 10) / 10, // Round to 1 decimal
                totalRatings: newTotalRatings,
                updatedAt: serverTimestamp(),
            });
        }
    } catch (error) {
        console.error("Error updating scribe rating:", error);
        throw error;
    }
};

export const getFeedbackByScribe = async (scribeId: string) => {
    try {
        const q = query(
            collection(db, COLLECTIONS.FEEDBACK),
            where("scribeId", "==", scribeId),
            orderBy("createdAt", "desc")
        );

        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        })) as Feedback[];
    } catch (error) {
        console.error("Error getting feedback by scribe:", error);
        throw error;
    }
};

// Utility function to calculate match score
export const calculateMatchScore = (
    student: Student,
    scribe: Scribe
): number => {
    let score = 0;

    // Subject match (40% weight)
    if (student.subjects && scribe.subjects) {
        const commonSubjects = student.subjects.filter((subject) =>
            scribe.subjects.includes(subject)
        );
        score += (commonSubjects.length / student.subjects.length) * 40;
    }

    // Location match (30% weight)
    if (student.examDetails?.location && scribe.location) {
        if (
            student.examDetails.location.includes(scribe.location) ||
            scribe.location.includes("Delhi")
        ) {
            // Assuming Delhi area matching
            score += 30;
        }
    }

    // Language match (20% weight)
    if (student.examDetails?.language && scribe.language) {
        if (scribe.language.includes(student.examDetails.language)) {
            score += 20;
        }
    }

    // Rating bonus (10% weight)
    if (scribe.rating >= 4.5) {
        score += 10;
    } else if (scribe.rating >= 4.0) {
        score += 7;
    } else if (scribe.rating >= 3.5) {
        score += 5;
    }

    return Math.min(Math.round(score), 100);
};
