# Admin Request System

This document explains the admin request system for the AR (Accessible Resources) platform.

## Overview

When someone signs up to be an admin, they need to go through an approval process by a super administrator. This ensures that only authorized personnel from educational institutions can manage scribe requests and student matches.

## Flow

### 1. Admin Signup Flow

1. User signs up through Clerk authentication
2. User selects "Admin" role in the role selection page (`/choose-role`)
3. User is redirected to admin profile page (`/profile/admin`)
4. User fills out school information and uploads verification documents
5. System creates an admin request with status "pending"
6. User sees success confirmation and is directed to wait for approval

### 2. Super Admin Approval Flow

1. Super admin logs into dashboard (`/dashboard/superadmin`)
2. Super admin sees pending admin requests in the "Admin Requests" tab
3. Super admin can review:
   - School details
   - User information
   - Uploaded documents
   - Request timestamp
4. Super admin can either:
   - **Approve**: Admin gains access to admin dashboard
   - **Reject**: Admin is denied access with reason provided

### 3. Admin Access Control

- When an admin tries to access `/dashboard/admin`, the system checks their approval status
- Different states are handled:
  - **Not requested**: Shows option to request admin access
  - **Pending**: Shows waiting for approval message
  - **Rejected**: Shows rejection reason with option to submit new request
  - **Approved**: Shows full admin dashboard

## API Endpoints

### POST `/api/admin-requests`
Creates a new admin access request.

**Request Body:**
```json
{
  "userId": "string",
  "schoolName": "string",
  "schoolId": "string",
  "documents": {
    "schoolCertificate": "string (URL)",
    "idProof": "string (URL)"
  }
}
```

### GET `/api/admin-requests?status=pending`
Retrieves pending admin requests (for super admin).

### PUT `/api/admin-requests`
Approves or rejects an admin request.

**Request Body:**
```json
{
  "requestId": "string",
  "action": "approve" | "reject",
  "superAdminId": "string",
  "rejectionReason": "string (required for reject)"
}
```

### GET `/api/admin-status?userId=string`
Checks the admin approval status for a user.

**Response:**
```json
{
  "adminStatus": {
    "isApproved": boolean,
    "isPending": boolean,
    "isRejected": boolean,
    "requestId": "string",
    "schoolName": "string",
    "rejectionReason": "string (if rejected)"
  }
}
```

## Components

### `/app/profile/admin/page.tsx`
- Admin profile creation form
- Document upload interface
- School information collection
- Success/error handling

### `/app/dashboard/admin/page.tsx`
- Admin dashboard with access control
- Shows different states based on approval status
- Redirects to profile if not requested

### `/app/dashboard/superadmin/page.tsx`
- Super admin dashboard
- Admin request management interface
- Approval/rejection functionality

### `/components/admin/AdminRequestManager.tsx`
- Super admin component for managing admin requests
- Request listing and filtering
- Approve/reject actions

## Database Schema

### admin_requests collection
```typescript
{
  id: string;
  userId: string;
  schoolName: string;
  schoolId: string;
  status: 'pending' | 'approved' | 'rejected';
  documents?: {
    schoolCertificate?: string;
    idProof?: string;
  };
  requestedAt: Timestamp;
  approvedAt?: Timestamp;
  rejectedAt?: Timestamp;
  approvedBy?: string;
  rejectedBy?: string;
  rejectionReason?: string;
}
```

### admins collection
```typescript
{
  id: string;
  userId: string;
  schoolName: string;
  schoolId: string;
  isApproved: boolean;
  approvedBy?: string;
  approvedAt?: Timestamp;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

## Hooks

### `useAdminRequests`
- Manages admin requests (create, approve, reject)
- Used by both admin profile page and super admin dashboard

### `useAdminStatus`
- Checks admin approval status
- Used by admin dashboard for access control

## Security Considerations

1. **Authentication**: All admin requests require valid Clerk authentication
2. **Authorization**: Only super admins can approve/reject requests
3. **Document Verification**: Manual review of uploaded documents required
4. **Audit Trail**: All approval/rejection actions are logged with timestamps and super admin IDs

## Future Enhancements

1. **Email Notifications**: Notify admins when their request is approved/rejected
2. **Bulk Actions**: Allow super admins to approve/reject multiple requests
3. **Advanced Filtering**: Filter requests by school, date, status, etc.
4. **Document Preview**: In-app document viewer for verification
5. **Request History**: Show all requests made by a user
6. **Automated Verification**: Integration with school databases for automatic verification
