from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    first_Name = db.Column(db.String(120), nullable=False, default='')
    last_Name = db.Column(db.String(120), nullable=False, default='')
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "first_Name": self.first_Name,
            "last_Name": self.last_Name
            # do not serialize the password, its a security breach
        }