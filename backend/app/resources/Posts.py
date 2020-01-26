from flask import request
from app.resources.Common.UsersCommon import UsersCommon
# from app.resources.Profile.Images import Images
# from app.resources.Profile.Tags import Tags
# from flask_jwt_extended import jwt_required
import base64


class Posts(UsersCommon):

    # #@jwt_required
    def get(self):
        # user_id = request.args.get('user_id')
        sql = """
                SELECT  p.*, u.user_name
                FROM posts p
                INNER JOIN  users u ON u.user_id = p.user_id
            ;"""
        # record = (user_id,)
        posts = self.base_get_all(sql)
        return posts

    def post(self):
        req_params = dict(request.form)
        req_params['picture'] = self._to_base64(req_params['picture'])
        self.__write_post_to_db(req_params)
        # self.__write_post_to_users_posts_db(post_id, user_id)
        # print(req_params)
        return "ok"


    # def __manage_user_params(self, params, user_id):
    #     image_obj = Images()
    #     result_image = image_obj.handle_images(request.files, user_id)
    #     if result_image != "ok":
    #         return result_image
    #     return params

    def _to_base64(self, image):
        data = 'data:image/'
        image_64_encoded = (base64.b64encode(image.read())).decode("utf-8")
        extention = image.filename.rsplit('.', 1)[1].lower() + ';base64,'
        new_image = data + extention + image_64_encoded
        return new_image
    # def __write_post_to_users_posts_db(self, post_id, user_id):
    #     sql = '''INSERT INTO users_posts (post_id, user_id)
    #                VALUES (%s, %s);'''
    #     record = (post_id, user_id)
    #     self.base_write(sql, record)
    #     return 'ok'


    def __write_post_to_db(self, params):
        sql = '''INSERT INTO posts (user_id, info, tag, picture)
                   VALUES (%s, %s, %s) RETURNING post_id;'''
        record = (params['user_id'], params['info'], params['tag'], params['picture'])
        post_dict_id = self.base_write(sql, record)
        # post_id = post_dict_id['post_id']
        # return post_id
