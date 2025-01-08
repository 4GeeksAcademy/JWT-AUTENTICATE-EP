"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api, resources={r"/*": {"origins": "https://effective-halibut-g4497vv6xw65hv74q-3000.app.github.dev"}})  # Permitir todas las solicitudes de origen


# @api.route('/hello', methods=['POST', 'GET'])
# def handle_hello():

#     response_body = {
#         "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
#     }

#     return jsonify(response_body), 200

@api.route('/hello2', methods=['POST', 'GET'])
def handle_hello2():

    response_body = {
        "message": "ESte es mi segundo hello"
    }
    response = jsonify(response_body)
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response, 200

# Create a route to authenticate your users and return JWTs. The
# create_ s_token() function is used to actually generate the JWT.
@api.route("/login", methods=["POST"])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    user = User.query.filter_by (email=email).first()
    print(user) 

    if user == None:
        return jsonify({"msg": "No encuentro tu email"}), 401
    if email != user.email or password != user.password:
        return jsonify({"msg": "Email o usuario incorrecto"}), 401

    access_token = create_access_token(identity=email)
    response = jsonify(access_token=access_token)
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response

@api.route("/signup", methods=["POST"])
def signup():
    body = request.get_json()
    email = body.get("email")
    password = body.get("password")
    first_Name = body.get("first_Name")
    last_Name = body.get("last_Name")

    if not email or not password or not first_Name or not last_Name:
        return jsonify({"msg": "Faltan datos"}), 400

    user = User.query.filter_by(email=email).first()
    
    if user is None:
        user = User(email=email, password=password, first_Name=first_Name, last_Name=last_Name, is_active=True)
        db.session.add(user)
        db.session.commit()
        response_body = {
            "msg": "Usuario creado"
        }
        response = jsonify(response_body)
        response.headers.add("Access-Control-Allow-Origin", "*")
        return response, 200 
    else:
        response = jsonify({"msg": "Ya tenemos fichado un cliente con ese correo"})
        response.headers.add("Access-Control-Allow-Origin", "*")
        return response, 401

  
@api.route('/user/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify(message="Usuario no válido"), 404

    try:
        db.session.delete(user)
        db.session.commit()   
        return jsonify(message="Usuario eliminado"), 200
    except Exception as e:
        db.session.rollback() 
        return jsonify(message="Error, usuario no eliminado", error=str(e)), 500

@api.route("/privatepage", methods=["GET"])
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    if current_user:
        response = jsonify(logged_in_as=current_user)
        response.headers.add("Access-Control-Allow-Origin", "*")
        return response, 200
    else:
        response = jsonify({"msg": "Usuario no autenticado"})
        response.headers.add("Access-Control-Allow-Origin", "*")
        return response, 401


if __name__ == "__main__":
    api.run()
