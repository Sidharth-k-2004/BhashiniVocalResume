"""
Database initialization script for Neon PostgreSQL
Run this script to create all database tables
"""
from new import app, db
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

def init_database():
    """Initialize the database tables"""
    with app.app_context():
        print("Creating database tables...")
        try:
            # Create all tables
            db.create_all()
            print("✓ Database tables created successfully!")
            print(f"✓ Using database: {app.config['SQLALCHEMY_DATABASE_URI'][:50]}...")
        except Exception as e:
            print(f"✗ Error creating database tables: {e}")
            raise

if __name__ == '__main__':
    init_database()

