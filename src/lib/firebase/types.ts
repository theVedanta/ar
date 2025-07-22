export interface User {
    id: string; // Clerk userId
    email?: string; // Optional, from Clerk
    name: string;
    role: "student" | "scribe" | "admin" | "superadmin";
    createdAt: Date;
    updatedAt: Date;
    isActive: boolean;
}

export interface Student extends User {
    role: "student";
    class: string;
    subjects: string[];
    examDetails?: {
        examName: string;
        examType: string;
        examDate: string;
        examTime: string;
        location: string;
        language: string;
        genderPreference?: string;
    };
    disability: {
        type: string;
        description?: string;
    };
    schoolId?: string;
}

export interface Scribe extends User {
    role: "scribe";
    subjects: string[];
    experience: string;
    rating: number;
    totalRatings: number;
    examTypes: string[];
    location: string;
    language: string[];
    availability: "available" | "busy" | "inactive";
    gender: string;
    age: number;
}

export interface Admin extends User {
    role: "admin";
    schoolName: string;
    schoolId: string;
    isApproved: boolean;
    approvedBy?: string;
    approvedAt?: Date;
}

export interface SuperAdmin extends User {
    role: "superadmin";
}

// Request types
export interface ScribeRequest {
    id: string;
    studentId: string;
    scribeId: string;
    status: "pending" | "approved" | "rejected" | "completed";
    examDetails: {
        examName: string;
        examType: string;
        examDate: string;
        examTime: string;
        location: string;
        subjects: string[];
    };
    createdAt: Date;
    updatedAt: Date;
    matchScore?: number;
    adminId?: string; // Admin who needs to approve
    approvedBy?: string;
    approvedAt?: Date;
    rejectedBy?: string;
    rejectedAt?: Date;
    rejectionReason?: string;
}

export interface AdminRequest {
    id: string;
    userId: string;
    schoolName: string;
    schoolId: string;
    status: "pending" | "approved" | "rejected";
    requestedAt: Date;
    approvedBy?: string;
    approvedAt?: Date;
    rejectedBy?: string;
    rejectedAt?: Date;
    rejectionReason?: string;
    documents?: {
        schoolCertificate?: string;
        idProof?: string;
    };
}

export interface Match {
    id: string;
    studentId: string;
    scribeId: string;
    examDetails: {
        examName: string;
        examType: string;
        examDate: string;
        examTime: string;
        location: string;
        subjects: string[];
    };
    status: "matched" | "confirmed" | "completed" | "cancelled";
    matchScore: number;
    createdAt: Date;
    confirmedAt?: Date;
    completedAt?: Date;
    cancelledAt?: Date;
    cancelReason?: string;
}

export interface Feedback {
    id: string;
    matchId: string;
    studentId: string;
    scribeId: string;
    rating: number;
    feedback: string;
    createdAt: Date;
    isAnonymous: boolean;
}

// Collection names
export const COLLECTIONS = {
    USERS: "users",
    STUDENTS: "students",
    SCRIBES: "scribes",
    ADMINS: "admins",
    SUPERADMINS: "superadmins",
    SCRIBE_REQUESTS: "scribeRequests",
    ADMIN_REQUESTS: "adminRequests",
    MATCHES: "matches",
    FEEDBACK: "feedback",
} as const;

// Status enums
export const REQUEST_STATUS = {
    PENDING: "pending",
    APPROVED: "approved",
    REJECTED: "rejected",
    COMPLETED: "completed",
} as const;

export const MATCH_STATUS = {
    MATCHED: "matched",
    CONFIRMED: "confirmed",
    COMPLETED: "completed",
    CANCELLED: "cancelled",
} as const;

export const AVAILABILITY_STATUS = {
    AVAILABLE: "available",
    BUSY: "busy",
    INACTIVE: "inactive",
} as const;

export type RequestStatus =
    (typeof REQUEST_STATUS)[keyof typeof REQUEST_STATUS];
export type MatchStatus = (typeof MATCH_STATUS)[keyof typeof MATCH_STATUS];
export type AvailabilityStatus =
    (typeof AVAILABILITY_STATUS)[keyof typeof AVAILABILITY_STATUS];
