from app.resources.Common.Base import Base
from flask import request, session


class Users(Base):

    # #@jwt_required
    def get(self):
        sql = """
                SELECT  *
                FROM users
                ORDER BY likes DESC
            ;"""
        users = self.base_get_all(sql)
        # self.change_data(users)
        return users

    def post(self):
        email = request.json['email']
        login = request.json['login']
        password = request.json['password']
        name = request.json['name']

        record = (email, login, password, name)
        sql = '''INSERT INTO users (email, login, password, user_name)
                 VALUES (%s, %s, %s, %s);'''
        res = self.base_write(sql, record)
        return res
