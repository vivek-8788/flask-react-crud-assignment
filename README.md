# Flask + React Task Manager with Comments

A full-stack web application built with Flask (backend) and React (frontend) that allows users to manage tasks and add comments to them.

## Features

### Backend (Flask)
- **Task CRUD Operations**: Create, read, update, and delete tasks
- **Comment CRUD Operations**: Create, read, update, and delete comments for tasks
- **RESTful API Design**: Following REST principles for all endpoints
- **Database Models**: SQLAlchemy models with proper relationships
- **Error Handling**: Comprehensive error handling with appropriate HTTP status codes
- **Data Validation**: Input validation for all API endpoints
- **Automated Tests**: Complete test suite using pytest

### Frontend (React)
- **Task Management**: Create, edit, delete, and toggle task completion
- **Comment System**: Add, edit, and delete comments for each task
- **Responsive Design**: Mobile-friendly interface
- **Real-time Updates**: Immediate UI updates after API operations
- **Error Handling**: User-friendly error messages
- **Loading States**: Visual feedback during API operations

## API Endpoints

### Tasks
- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create a new task
- `GET /api/tasks/<id>` - Get a specific task
- `PUT /api/tasks/<id>` - Update a task
- `DELETE /api/tasks/<id>` - Delete a task

### Comments
- `GET /api/tasks/<task_id>/comments` - Get all comments for a task
- `POST /api/tasks/<task_id>/comments` - Create a comment for a task
- `GET /api/comments/<id>` - Get a specific comment
- `PUT /api/comments/<id>` - Update a comment
- `DELETE /api/comments/<id>` - Delete a comment

## Technology Stack

### Backend
- **Flask**: Web framework
- **SQLAlchemy**: ORM for database operations
- **Flask-CORS**: Cross-origin resource sharing
- **Flask-Migrate**: Database migrations
- **SQLite**: Database (can be easily switched to PostgreSQL/MySQL)
- **pytest**: Testing framework

### Frontend
- **React**: UI library
- **Vite**: Build tool and dev server
- **Axios**: HTTP client for API calls
- **Lucide React**: Icon library
- **CSS3**: Styling with modern features

## Installation and Setup

### Prerequisites
- Python 3.8+
- Node.js 16+
- npm or yarn

### Backend Setup
1. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```

2. Initialize the database:
   ```bash
   python app.py
   ```

3. Run tests:
   ```bash
   pytest test_app.py -v
   ```

### Frontend Setup
1. Install Node.js dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

### Running the Application
1. Start the Flask backend:
   ```bash
   python app.py
   ```
   The backend will run on `http://localhost:5000`

2. Start the React frontend:
   ```bash
   npm run dev
   ```
   The frontend will run on `http://localhost:5173`

## Project Structure

```
├── app.py                 # Flask application with API routes
├── test_app.py           # Automated tests for API endpoints
├── requirements.txt      # Python dependencies
├── .env                 # Environment variables
├── package.json         # Node.js dependencies and scripts
├── vite.config.js       # Vite configuration
├── index.html           # HTML template
└── src/
    ├── main.jsx         # React entry point
    ├── App.jsx          # Main App component
    ├── index.css        # Global styles
    ├── components/      # React components
    │   ├── TaskList.jsx
    │   ├── TaskCard.jsx
    │   ├── TaskForm.jsx
    │   ├── CommentSection.jsx
    │   ├── CommentList.jsx
    │   ├── CommentItem.jsx
    │   └── CommentForm.jsx
    └── services/
        └── api.js       # API service functions
```

## Key Design Decisions

### Backend Architecture
1. **Separation of Concerns**: Clear separation between models, routes, and business logic
2. **RESTful Design**: Following REST principles for intuitive API design
3. **Database Relationships**: Proper foreign key relationships with cascade delete
4. **Error Handling**: Consistent error responses with appropriate HTTP status codes
5. **Input Validation**: Server-side validation for all user inputs

### Frontend Architecture
1. **Component-Based**: Modular React components for reusability
2. **State Management**: Local state management with React hooks
3. **API Layer**: Centralized API service for all backend communication
4. **User Experience**: Loading states, error handling, and confirmation dialogs
5. **Responsive Design**: Mobile-first approach with flexible layouts

### Testing Strategy
1. **Comprehensive Coverage**: Tests for all CRUD operations
2. **Edge Cases**: Testing error conditions and validation
3. **Fixtures**: Reusable test data setup
4. **Isolation**: Each test runs in isolation with fresh database

## Trade-offs and Technical Debt

### Current Trade-offs
1. **Authentication**: No user authentication system (simplified for demo)
2. **Database**: Using SQLite for simplicity (production would use PostgreSQL)
3. **State Management**: Local state instead of Redux (sufficient for current scope)
4. **Real-time Updates**: No WebSocket implementation (would be beneficial for collaboration)

### Future Improvements
1. **User Authentication**: Add JWT-based authentication
2. **Pagination**: Implement pagination for large datasets
3. **Search and Filtering**: Add search functionality for tasks and comments
4. **File Uploads**: Support for task attachments
5. **Email Notifications**: Notify users of comment updates
6. **Performance**: Add caching layer for frequently accessed data

## Testing

The application includes comprehensive automated tests covering:
- All CRUD operations for tasks and comments
- Error handling and validation
- Edge cases and boundary conditions
- Database relationships and cascading deletes

Run tests with:
```bash
pytest test_app.py -v
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

## License

This project is open source and available under the MIT License.