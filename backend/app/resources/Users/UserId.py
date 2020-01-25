from flask import request
from app.resources.Common.UsersCommon import UsersCommon
from app.resources.Profile.Images import Images
from app.resources.Profile.Tags import Tags


COMPANY = {
    'contact_name': 'Контактное лицо',
    'inn': 'ИНН',
    'ogrn': 'ОГРН',
    'kpp': 'КПП',
    'contracts_all': 'Всего контрактов',
    'contracts_made': 'Выполенных контрактов',
    'contracts_canceled': 'Отменненные контракты',
    'contracts_processing': 'Контракты в исполнении',
    'city': 'Город'
}


class UserId(UsersCommon):

    # #@jwt_required
    def get(self, user_id):
        sql = """
                SELECT  *
                FROM users u
                WHERE u.user_id = %s
            ;"""
        record = (user_id,)
        user = self.base_get_one(sql, record)
        if user is None:
            return 'Нет пользователей'
        self.change_data(user)
        return user

    def change_data(self, user):
        additional_info = []
        for key, value in user.items():
            if key in COMPANY:
                additional_info.append({'name': COMPANY[key], 'value': value})
        user['additional_info'] = additional_info

    def delete(self, user_id):
        sql = """DELETE from users WHERE user_id = %s"""
        record = (user_id,)
        res = self.base_write(sql, record)
        return res

    # #@jwt_required
    def put(self, user_id):
        req_params = dict(request.form)
        params = self.__manage_user_params(req_params, user_id)
        if isinstance(params, str):
            return {'error': params}
        self.__write_userdata_to_db(params, user_id)
        return "ok"

    def __manage_user_params(self, params, user_id):
        checked_params = self.check_user_params(params)
        res = self.handle_tags(checked_params, user_id)
        image_obj = Images()
        result_image = image_obj.handle_images(request.files, user_id)
        if result_image != "ok":
            return result_image
        return res

    @staticmethod
    def check_user_params(params):
        allowed_user_columns = ['email', 'login', 'password', 'user_name', 'age', 'sex', 'preferences', 'bio', 'city',
                                'latitude', 'longitude', 'notification', 'tags']
        for key in params.copy():
            if key not in allowed_user_columns:
                del params[key]
        return params

    @staticmethod
    def handle_tags(params, user_id):
        if "tags" in params:
            import json
            tags = json.loads(params['tags'])
            tag_obj = Tags()
            tag_obj.manage_tags(tags, user_id)
            del params["tags"]
        return params

    def __write_userdata_to_db(self, params, user_id):
        for key, value in params.items():
            sql = "UPDATE users SET {} = %s WHERE user_id =%s".format(key)
            if key == "password":
                value = self.to_hash(value)
            record = (value, user_id)
            self.base_write(sql, record)
