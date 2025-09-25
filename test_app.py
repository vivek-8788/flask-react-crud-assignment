import pytest
import json
from app import app, db, Task, Comment

@pytest.fixture
def client():
    app.config['TESTING'] = True
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'
    
    with app.test_client() as client:
        with app.app_context():
            db.create_all()
            yield client
            db.drop_all()

@pytest.fixture
def sample_task(client):
    """Create a sample task for testing"""
    task = Task(title="Test Task", description="Test Description")
    db.session.add(task)
    db.session.commit()
    return task

@pytest.fixture
def sample_comment(client, sample_task):
    """Create a sample comment for testing"""
    comment = Comment(content="Test Comment", author="Test Author", task_id=sample_task.id)
    db.session.add(comment)
    db.session.commit()
    return comment

class TestCommentAPI:
    """Test suite for Comment CRUD operations"""
    
    def test_create_comment_success(self, client, sample_task):
        """Test successful comment creation"""
        data = {
            'content': 'This is a test comment',
            'author': 'Test User'
        }
        
        response = client.post(f'/api/tasks/{sample_task.id}/comments', 
                             data=json.dumps(data),
                             content_type='application/json')
        
        assert response.status_code == 201
        response_data = json.loads(response.data)
        assert response_data['content'] == data['content']
        assert response_data['author'] == data['author']
        assert response_data['task_id'] == sample_task.id
    
    def test_create_comment_missing_content(self, client, sample_task):
        """Test comment creation with missing content"""
        data = {'author': 'Test User'}
        
        response = client.post(f'/api/tasks/{sample_task.id}/comments',
                             data=json.dumps(data),
                             content_type='application/json')
        
        assert response.status_code == 400
        response_data = json.loads(response.data)
        assert 'error' in response_data
    
    def test_create_comment_missing_author(self, client, sample_task):
        """Test comment creation with missing author"""
        data = {'content': 'Test content'}
        
        response = client.post(f'/api/tasks/{sample_task.id}/comments',
                             data=json.dumps(data),
                             content_type='application/json')
        
        assert response.status_code == 400
        response_data = json.loads(response.data)
        assert 'error' in response_data
    
    def test_create_comment_nonexistent_task(self, client):
        """Test comment creation for non-existent task"""
        data = {
            'content': 'This is a test comment',
            'author': 'Test User'
        }
        
        response = client.post('/api/tasks/999/comments',
                             data=json.dumps(data),
                             content_type='application/json')
        
        assert response.status_code == 404
    
    def test_get_comments_success(self, client, sample_task, sample_comment):
        """Test successful retrieval of comments"""
        response = client.get(f'/api/tasks/{sample_task.id}/comments')
        
        assert response.status_code == 200
        response_data = json.loads(response.data)
        assert len(response_data) == 1
        assert response_data[0]['id'] == sample_comment.id
    
    def test_get_comments_empty_list(self, client, sample_task):
        """Test retrieval of comments for task with no comments"""
        response = client.get(f'/api/tasks/{sample_task.id}/comments')
        
        assert response.status_code == 200
        response_data = json.loads(response.data)
        assert len(response_data) == 0
    
    def test_get_comments_nonexistent_task(self, client):
        """Test retrieval of comments for non-existent task"""
        response = client.get('/api/tasks/999/comments')
        
        assert response.status_code == 404
    
    def test_get_single_comment_success(self, client, sample_comment):
        """Test successful retrieval of single comment"""
        response = client.get(f'/api/comments/{sample_comment.id}')
        
        assert response.status_code == 200
        response_data = json.loads(response.data)
        assert response_data['id'] == sample_comment.id
        assert response_data['content'] == sample_comment.content
    
    def test_get_single_comment_not_found(self, client):
        """Test retrieval of non-existent comment"""
        response = client.get('/api/comments/999')
        
        assert response.status_code == 404
    
    def test_update_comment_success(self, client, sample_comment):
        """Test successful comment update"""
        data = {
            'content': 'Updated comment content',
            'author': 'Updated Author'
        }
        
        response = client.put(f'/api/comments/{sample_comment.id}',
                            data=json.dumps(data),
                            content_type='application/json')
        
        assert response.status_code == 200
        response_data = json.loads(response.data)
        assert response_data['content'] == data['content']
        assert response_data['author'] == data['author']
    
    def test_update_comment_partial(self, client, sample_comment):
        """Test partial comment update"""
        original_author = sample_comment.author
        data = {'content': 'Updated content only'}
        
        response = client.put(f'/api/comments/{sample_comment.id}',
                            data=json.dumps(data),
                            content_type='application/json')
        
        assert response.status_code == 200
        response_data = json.loads(response.data)
        assert response_data['content'] == data['content']
        assert response_data['author'] == original_author
    
    def test_update_comment_not_found(self, client):
        """Test update of non-existent comment"""
        data = {'content': 'Updated content'}
        
        response = client.put('/api/comments/999',
                            data=json.dumps(data),
                            content_type='application/json')
        
        assert response.status_code == 404
    
    def test_delete_comment_success(self, client, sample_comment):
        """Test successful comment deletion"""
        response = client.delete(f'/api/comments/{sample_comment.id}')
        
        assert response.status_code == 200
        response_data = json.loads(response.data)
        assert 'message' in response_data
        
        # Verify comment is actually deleted
        get_response = client.get(f'/api/comments/{sample_comment.id}')
        assert get_response.status_code == 404
    
    def test_delete_comment_not_found(self, client):
        """Test deletion of non-existent comment"""
        response = client.delete('/api/comments/999')
        
        assert response.status_code == 404

class TestTaskAPI:
    """Test suite for Task CRUD operations"""
    
    def test_create_task_success(self, client):
        """Test successful task creation"""
        data = {
            'title': 'Test Task',
            'description': 'Test Description',
            'completed': False
        }
        
        response = client.post('/api/tasks',
                             data=json.dumps(data),
                             content_type='application/json')
        
        assert response.status_code == 201
        response_data = json.loads(response.data)
        assert response_data['title'] == data['title']
        assert response_data['description'] == data['description']
        assert response_data['completed'] == data['completed']
    
    def test_get_tasks(self, client, sample_task):
        """Test retrieval of all tasks"""
        response = client.get('/api/tasks')
        
        assert response.status_code == 200
        response_data = json.loads(response.data)
        assert len(response_data) >= 1
    
    def test_update_task_success(self, client, sample_task):
        """Test successful task update"""
        data = {
            'title': 'Updated Task',
            'completed': True
        }
        
        response = client.put(f'/api/tasks/{sample_task.id}',
                            data=json.dumps(data),
                            content_type='application/json')
        
        assert response.status_code == 200
        response_data = json.loads(response.data)
        assert response_data['title'] == data['title']
        assert response_data['completed'] == data['completed']
    
    def test_delete_task_with_comments(self, client, sample_task, sample_comment):
        """Test task deletion cascades to comments"""
        response = client.delete(f'/api/tasks/{sample_task.id}')
        
        assert response.status_code == 200
        
        # Verify comment is also deleted
        comment_response = client.get(f'/api/comments/{sample_comment.id}')
        assert comment_response.status_code == 404

if __name__ == '__main__':
    pytest.main(['-v'])