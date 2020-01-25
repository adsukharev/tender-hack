from flask import request
from app.resources.Common.UsersCommon import UsersCommon
from app.resources.Profile.Images import Images
# from app.resources.Profile.Tags import Tags
# from flask_jwt_extended import jwt_required


class Posts(UsersCommon):

    # #@jwt_required
    def get(self, user_id):
        sql = """
                SELECT  u.*, r.sumLikes, l.likes, h.history, t.tags
                FROM users u
                LEFT JOIN rating r ON r.user_fk = u.user_id
                LEFT JOIN (
                      SELECT likes.to_like_fk, array_agg(u.login) as likes
                      FROM likes
                      JOIN  users u ON u.user_id = likes.from_like_fk
                      GROUP BY 1
                      ) l ON u.user_id = l.to_like_fk
                LEFT JOIN (
                      SELECT history.to_history_fk, array_agg(u.login) as history
                      FROM history
                      JOIN  users u ON u.user_id = history.from_history_fk
                      GROUP BY 1
                      ) h ON u.user_id = h.to_history_fk
                LEFT JOIN (
                     SELECT user_id as user_id_fk, array_agg(tags.tag_name) as tags
                     FROM users_tags
                     JOIN  tags USING (tag_id)
                     GROUP BY 1
                     ) t ON u.user_id = t.user_id_fk
                WHERE u.user_id = %s
            ;"""
        record = (user_id,)
        user = self.base_get_one(sql, record)
        return user

    def post(self, user_id):
        req_params = dict(request.form)
        self.__write_userdata_to_db(req_params, user_id)
        params = self.__manage_user_params(req_params, user_id)

        return "ok"


    def __manage_user_params(self, params, user_id):
        image_obj = Images()
        result_image = image_obj.handle_images(request.files, user_id)
        if result_image != "ok":
            return result_image
        return params


    # @staticmethod
    # def handle_tags(params, user_id):
    #     if "tags" in params:
    #         import json
    #         tags = json.loads(params['tags'])
    #         # tag_obj.manage_tags(tags, user_id)
    #         # del params["tags"]
    #     return params

    def __write_userdata_to_db(self, params, user_id):
        sql = '''INSERT INTO posts (info, tag)
                   VALUES (%s, %s);'''
        record = (params.info, params.tag)
        post_id = self.base_write(sql, record)
        print('post_id', post_id)
