# Family Newsletter Application

A comprehensive web application for managing family newsletters with role-based access control.

## Features

### Admin Features
- Create and manage newsletters
- Set newsletter frequency (Daily, Weekly, Bi-weekly, Monthly)
- Choose email templates
- Create custom questionnaires
- Invite contributors (USER1)
- Manage all users
- Create newsletter editions with special questions
- Review responses before sending
- Send newsletters to all recipients

### Contributor (USER1) Features
- Accept invitation and create account
- View available questionnaires
- Submit responses to questionnaires
- Upload photos and videos (future enhancement)
- Invite recipients (USER2)
- View submission history

### Recipient (USER2) Features
- Accept invitation
- Receive newsletters via email
- View newsletter content

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS
- **Database**: SQLite with Prisma ORM
- **Authentication**: JWT with HTTP-only cookies
- **Email**: Mock email service (console logging for demo)

## Installation

1. Install dependencies:
```bash
cd family-newsletter
npm install
```

2. Initialize the database:
```bash
npx prisma generate
npx prisma db push
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to:
```
http://localhost:3000
```

## User Flow

### 1. Admin Registration
1. Navigate to the home page
2. Click "Get Started" under Admin
3. Fill in registration form (name, email, password)
4. Redirected to Admin Dashboard

### 2. Create Newsletter
1. From Admin Dashboard, click "Create New Newsletter"
2. Enter newsletter title
3. Select frequency (Daily, Weekly, Bi-weekly, Monthly)
4. Choose email template
5. Click "Create"

### 3. Create Questionnaire
1. Click on a newsletter from the dashboard
2. Click "Create Questionnaire"
3. Enter questionnaire title and description
4. Add questions (can add multiple)
5. Click "Create Questionnaire"

### 4. Invite Contributors
1. From Admin Dashboard, click "Invite Users"
2. Enter email address
3. Select role: "Contributor (can submit content)"
4. Click "Send Invitation"
5. Invitation email is logged to console (check terminal)

### 5. Contributor Accepts Invitation
1. Copy the invitation URL from console logs
2. Open URL in browser (or new incognito window)
3. Enter name and password
4. Click "Accept Invitation"
5. Redirected to Contributor Dashboard

### 6. Contributor Submits Response
1. From Contributor Dashboard, view available questionnaires
2. Click "Submit Response"
3. Answer all questions
4. Click "Submit Response"

### 7. Contributor Invites Recipients
1. From Contributor Dashboard, click "Invite Recipients"
2. Enter recipient email address
3. Click "Send Invitation"
4. Invitation email is logged to console

### 8. Recipient Accepts Invitation
1. Copy the invitation URL from console logs
2. Open URL in browser
3. Enter name (no password required for recipients)
4. Click "Accept Invitation"
5. Redirected to Recipient Dashboard

### 9. Admin Creates Edition
1. Navigate to newsletter detail page
2. Click "Create New Edition"
3. Optionally add a special question
4. Click "Create Edition"

### 10. Admin Sends Newsletter
1. View the edition with collected responses
2. Click "Send Now"
3. Confirm sending
4. Newsletter is sent to all recipients (logged to console)

## Database Schema

### User
- id, email, password, name, role (ADMIN, USER1, USER2)
- Relationships: newsletters, responses, media

### Newsletter
- id, title, frequency, emailTemplate, status
- Relationships: admin, questionnaires, editions

### Questionnaire
- id, title, description, questions (JSON)
- Relationships: newsletter, responses

### NewsletterEdition
- id, editionNumber, specialQuestion, status
- Relationships: newsletter, responses

### Response
- id, answers (JSON), specialAnswer
- Relationships: user, questionnaire, edition, media

### Media
- id, filename, filepath, mimetype, size
- Relationships: response, user

### Invitation
- id, email, role, token, status, expiresAt
- Used for inviting new users

## API Routes

### Authentication
- `POST /api/auth/register` - Register admin
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user

### Invitations
- `POST /api/invitations/send` - Send invitation
- `POST /api/invitations/accept` - Accept invitation
- `GET /api/invitations/verify` - Verify invitation token

### Newsletters
- `GET /api/newsletters` - List newsletters
- `POST /api/newsletters` - Create newsletter
- `GET /api/newsletters/[id]` - Get newsletter details
- `PATCH /api/newsletters/[id]` - Update newsletter
- `DELETE /api/newsletters/[id]` - Delete newsletter

### Questionnaires
- `GET /api/questionnaires` - List questionnaires
- `POST /api/questionnaires` - Create questionnaire
- `GET /api/questionnaires/[id]` - Get questionnaire
- `PATCH /api/questionnaires/[id]` - Update questionnaire
- `DELETE /api/questionnaires/[id]` - Delete questionnaire

### Responses
- `GET /api/responses` - List responses
- `POST /api/responses` - Submit response

### Editions
- `GET /api/editions` - List editions
- `POST /api/editions` - Create edition
- `POST /api/editions/[id]/send` - Send edition

### Users
- `GET /api/users` - List users
- `PATCH /api/users/[id]` - Update user
- `DELETE /api/users/[id]` - Delete user

## Email System

The application uses a mock email service for demonstration purposes. All emails are logged to the console instead of being sent. In production, you would integrate with:

- SendGrid
- AWS SES
- Mailgun
- Postmark
- Or any other email service provider

To integrate a real email service, update the `sendEmail` function in `lib/email.ts`.

## Security Features

- Password hashing with bcrypt
- JWT authentication with HTTP-only cookies
- Role-based access control
- Invitation token expiration (7 days)
- Session management

## Future Enhancements

1. **Media Upload**: Implement actual file upload for photos/videos
2. **Email Service**: Integrate with real email service provider
3. **Scheduled Sending**: Implement cron jobs for automatic newsletter sending
4. **Rich Text Editor**: Add WYSIWYG editor for responses
5. **Newsletter Templates**: More customizable email templates
6. **Analytics**: Track open rates and engagement
7. **Mobile App**: React Native mobile application
8. **Social Sharing**: Share newsletters on social media
9. **Export**: Export newsletters as PDF
10. **Multi-language**: Support for multiple languages

## Troubleshooting

### Database Issues
If you encounter database issues, reset the database:
```bash
rm prisma/dev.db
npx prisma db push
```

### Port Already in Use
If port 3000 is already in use:
```bash
npm run dev -- -p 3001
```

### Clear Cookies
If you have authentication issues, clear your browser cookies for localhost.

## License

MIT License - feel free to use this project for your own family newsletters!

## Support

For issues or questions, please check the console logs for detailed error messages.