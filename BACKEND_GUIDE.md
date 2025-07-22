# Backend Functionality Guide

This document explains the backend functionality for the scribe-student matching platform, including Firebase integration, API endpoints, and usage examples.

## Overview

The platform connects visually impaired students with scribes for exams. The system includes:

- **Students**: Request scribes for exams
- **Scribes**: Volunteer to help students
- **Admins**: School principals who approve/disapprove scribe requests
- **SuperAdmins**: Approve/disapprove admin applications

## Database Schema

### Collections

- `users` - Basic user information
- `students` - Student-specific data
- `scribes` - Scribe-specific data with ratings
- `admins` - Admin data with approval status
- `scribeRequests` - Requests for scribe-student matches
- `adminRequests` - Requests for admin approval
- `matches` - Confirmed scribe-student matches
- `feedback` - Post-exam feedback and ratings

### User Types

```typescript
interface Student {
  id: string;
  email: string;
  name: string;
  role: 'student';
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

interface Scribe {
  id: string;
  email: string;
  name: string;
  role: 'scribe';
  subjects: string[];
  experience: string;
  rating: number;
  totalRatings: number;
  location: string;
  availability: 'available' | 'busy' | 'inactive';
  // ... other fields
}

interface Admin {
  id: string;
  email: string;
  name: string;
  role: 'admin';
  schoolName: string;
  schoolId: string;
  isApproved: boolean;
  // ... other fields
}
```

## API Endpoints

### 1. User Management (`/api/users`)

#### Create User
```javascript
POST /api/users
{
  "email": "user@example.com",
  "name": "John Doe",
  "role": "student", // student | scribe | admin | superadmin
  // Additional role-specific data
  "class": "12th Grade", // for students
  "subjects": ["Math", "Physics"],
  "schoolName": "ABC School", // for admins
  "schoolId": "school-001"
}
```

#### Get User
```javascript
GET /api/users?userId=user123&role=student
```

### 2. Scribe Requests (`/api/scribe-requests`)

#### Create Scribe Request
```javascript
POST /api/scribe-requests
{
  "studentId": "student123",
  "scribeId": "scribe456",
  "examDetails": {
    "examName": "CBSE 12th Board",
    "examType": "Written",
    "examDate": "2024-12-20",
    "examTime": "10:00 AM",
    "location": "DPS Delhi",
    "subjects": ["Math", "Physics"]
  },
  "adminId": "admin789"
}
```

#### Get Scribe Requests (for admins)
```javascript
GET /api/scribe-requests?adminId=admin123
GET /api/scribe-requests?status=pending // for all pending
```

#### Approve/Reject Request
```javascript
PUT /api/scribe-requests
{
  "requestId": "req123",
  "action": "approve", // or "reject"
  "userId": "admin123",
  "rejectionReason": "Optional reason for rejection"
}
```

### 3. Admin Requests (`/api/admin-requests`)

#### Create Admin Request
```javascript
POST /api/admin-requests
{
  "userId": "user123",
  "schoolName": "Modern Public School",
  "schoolId": "school-002",
  "documents": {
    "schoolCertificate": "cert-url",
    "idProof": "id-proof-url"
  }
}
```

#### Get Pending Admin Requests (for superadmin)
```javascript
GET /api/admin-requests?status=pending
```

#### Approve/Reject Admin Request
```javascript
PUT /api/admin-requests
{
  "requestId": "req456",
  "action": "approve", // or "reject"
  "superAdminId": "superadmin123",
  "rejectionReason": "Optional reason"
}
```

### 4. Matches (`/api/matches`)

#### Create Matches (Auto-matching)
```javascript
POST /api/matches
{
  "studentId": "student123",
  "examDetails": {
    "examName": "CBSE 12th Board",
    "examType": "Written",
    "examDate": "2024-12-20",
    "examTime": "10:00 AM",
    "location": "Delhi",
    "subjects": ["Math", "Physics"]
  },
  "location": "Delhi"
}
```

#### Get Matches
```javascript
GET /api/matches?studentId=student123
GET /api/matches?scribeId=scribe456
```

#### Update Match Status
```javascript
PUT /api/matches
{
  "matchId": "match123",
  "action": "confirm" // or "complete"
}
```

### 5. Feedback (`/api/feedback`)

#### Submit Feedback
```javascript
POST /api/feedback
{
  "matchId": "match123",
  "studentId": "student123",
  "scribeId": "scribe456",
  "rating": 5, // 1-5
  "feedback": "Excellent support!",
  "isAnonymous": false
}
```

#### Get Scribe Feedback
```javascript
GET /api/feedback?scribeId=scribe456
```

## React Hooks

### useScribeRequests
```javascript
import { useScribeRequests } from '@/hooks/api/useScribeRequests';

function AdminDashboard() {
  const {
    requests,
    loading,
    error,
    refetch,
    createRequest,
    approveRequest,
    rejectRequest
  } = useScribeRequests({
    adminId: 'admin123',
    autoFetch: true
  });

  const handleApprove = async (requestId) => {
    try {
      await approveRequest(requestId, 'admin123');
      // Success handled automatically
    } catch (error) {
      console.error('Failed to approve:', error);
    }
  };

  return (
    <div>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {requests.map(request => (
        <div key={request.id}>
          {/* Request details */}
          <button onClick={() => handleApprove(request.id)}>
            Approve
          </button>
        </div>
      ))}
    </div>
  );
}
```

### useAdminRequests
```javascript
import { useAdminRequests } from '@/hooks/api/useAdminRequests';

function SuperAdminDashboard() {
  const {
    requests,
    loading,
    approveRequest,
    rejectRequest
  } = useAdminRequests({
    status: 'pending',
    autoFetch: true
  });

  // Similar usage as useScribeRequests
}
```

### useMatches
```javascript
import { useMatches } from '@/hooks/api/useMatches';

function StudentDashboard() {
  const {
    matches,
    loading,
    createMatches,
    confirmMatch
  } = useMatches({
    studentId: 'student123',
    autoFetch: true
  });

  const findScribes = async () => {
    try {
      const result = await createMatches({
        studentId: 'student123',
        examDetails: {
          // exam details
        },
        location: 'Delhi'
      });
      console.log('Found matches:', result.matches);
    } catch (error) {
      console.error('Failed to find matches:', error);
    }
  };
}
```

## Components

### AdminRequestManager
For SuperAdmin dashboard to manage admin approval requests.

```javascript
import AdminRequestManager from '@/components/admin/AdminRequestManager';

function SuperAdminPage() {
  return (
    <AdminRequestManager superAdminId="superadmin123" />
  );
}
```

### ScribeRequestManager
For Admin dashboard to manage scribe requests.

```javascript
import ScribeRequestManager from '@/components/admin/ScribeRequestManager';

function AdminPage() {
  return (
    <ScribeRequestManager adminId="admin123" />
  );
}
```

## Workflow Examples

### 1. New Admin Registration
1. User registers as admin via `/api/users`
2. System creates admin request via `/api/admin-requests`
3. SuperAdmin sees request in `AdminRequestManager`
4. SuperAdmin approves/rejects via `/api/admin-requests` PUT
5. If approved, admin's `isApproved` flag is set to `true`

### 2. Student Requesting Scribe
1. Student creates exam request
2. System finds matching scribes via `/api/matches`
3. Creates scribe request via `/api/scribe-requests`
4. Admin sees request in `ScribeRequestManager`
5. Admin approves/rejects via `/api/scribe-requests` PUT
6. If approved, match is confirmed

### 3. Post-Exam Feedback
1. After exam completion, match status updated via `/api/matches`
2. Student submits feedback via `/api/feedback`
3. Scribe's rating is automatically updated
4. Feedback visible in scribe's profile

## Firebase Setup

1. Create Firebase project
2. Enable Firestore
3. Set up authentication (optional)
4. Add Firebase config to `ar/src/app/db.ts`
5. Set `FIREBASE` environment variable

## Environment Variables

```bash
FIREBASE=your-firebase-api-key
```

## Testing

### Create Demo Data
```javascript
// Create demo users
POST /api/demo
{ "type": "users" }

// Create demo admin request
POST /api/demo
{ "type": "admin-request" }

// Create demo scribe request
POST /api/demo
{ "type": "scribe-request" }
```

## Error Handling

All APIs return consistent error responses:
```javascript
{
  "error": "Error message",
  "details": "Optional additional details"
}
```

Common HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request (missing/invalid data)
- `404` - Not Found
- `500` - Internal Server Error

## Security Considerations

1. **Authentication**: Add user authentication middleware
2. **Authorization**: Verify user roles for operations
3. **Data Validation**: Validate all inputs server-side
4. **Rate Limiting**: Add rate limiting to prevent abuse
5. **Sanitization**: Sanitize user inputs to prevent XSS

## Performance Optimization

1. **Indexing**: Add Firestore indexes for frequent queries
2. **Caching**: Cache frequently accessed data
3. **Pagination**: Implement pagination for large datasets
4. **Connection Pooling**: Optimize Firebase connections

## Monitoring & Logging

1. Add structured logging to all API endpoints
2. Monitor Firebase usage and costs
3. Set up alerts for errors and performance issues
4. Track key metrics (match success rate, response times)

## Future Enhancements

1. **Real-time Updates**: Add WebSocket support for live updates
2. **Notifications**: Push notifications for status changes
3. **File Uploads**: Support for document uploads
4. **Advanced Matching**: ML-based scribe matching
5. **Mobile App**: React Native mobile application
6. **Analytics**: Dashboard with usage analytics
