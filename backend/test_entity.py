import hashlib
import psycopg2
import psycopg2.extras
from flask import session
from app.app import app
from db.database_config import Database
from db.connection import start_connection, close_connection
from app.resources.Common.UsersCommon import UsersCommon
from app.resources.Profile.Likes import Likes
from app.resources.Profile.History import History
from app.resources.Profile.Tags import Tags
from app.resources.Rating import Rating
from user_images.images import usersImages, postsImages
# from app.resources.Users.UserId import UserId


password = UsersCommon.to_hash('123Wertyq')
users = [
    {
        'email': "test1@mail.ru",
        'login': 'test1',
        'password': password,
        'user_name': 'ВТБ',
        'contact_name': 'Олег Иванов',
        'info': 'Российский универсальный коммерческий банк c государственным участием ',
        'inn': 123213123,
        'ogrn': 2131323,
        'kpp': 12313,
        'contracts_all': 5,
        'contracts_made': 2,
        'contracts_canceled': 1,
        'contracts_processing': 1,
        'avatar': usersImages[0],
    },
    {
        'email': "test2@mail.ru",
        'login': 'test2',
        'password': password,
        'user_name': 'РусГидро',
        'contact_name': 'Екатерина Андреева',
        'info': 'РусГидро является лидером в производстве энергии на базе возобновляемых источников, развивающим генерацию на основе энергии водных потоков',
        'inn': 12313,
        'ogrn': 312312,
        'kpp': 3244,
        'contracts_all': 7,
        'contracts_made': 3,
        'contracts_canceled': 3,
        'contracts_processing': 1,
        'avatar': usersImages[1]
    },
    {
        'email': "test3@mail.ru",
        'login': 'test3',
        'password': password,
        'user_name': 'Роснано',
        'contact_name': 'Федор Фадеев',
        'info': 'АО «Роснано» содействует реализации государственной политики по развитию наноиндустрии, инвестируя напрямую и через инвестиционные фонды нанотехнологий в высокотехнологичные проекты, обеспечивающие развитие новых производств на территории Российской Федерации',
        'inn': 333333,
        'ogrn': 111111,
        'kpp': 4444,
        'contracts_all': 2,
        'contracts_made': 1,
        'contracts_canceled': 0,
        'contracts_processing': 1,
        'avatar': usersImages[2]
    },
    {
        'email': "test4@mail.ru",
        'login': 'test4',
        'password': password,
        'user_name': 'Спортмастер',
        'contact_name': 'Антон Колесников',
        'info': 'Интернет-магазин качественных спортивных товаров для фитнеса и тренинга, летних и зимних видов спорта, а также товаров для активного отдыха.',
        'inn': 23423,
        'ogrn': 324234324,
        'kpp': 777777,
        'contracts_all': 12,
        'contracts_made': 10,
        'contracts_canceled': 1,
        'contracts_processing': 1,
        'avatar': usersImages[3]
    },
    {
        'email': "test5@mail.ru",
        'login': 'test5',
        'password': password,
        'user_name': 'Ромашка',
        'contact_name': 'Надежда Бабкина',
        'info': 'Товары для дома',
        'inn': 888888,
        'ogrn': 333333,
        'kpp': 11111,
        'contracts_all': 4,
        'contracts_made': 1,
        'contracts_canceled': 1,
        'contracts_processing': 2,
        'avatar': usersImages[4]
    }
]


posts = [
    {
        'user_id': 1,
        'title': 'Как заниматься закупками',
        'description': 'Сотрудники нашей компании подробно расскажут об этом сложном процессе',
        'image': postsImages[0],
        'tag': 'Помощь',
        'dateAt': '01.12.2019',
        'likes': 12,
        'comments': 4
    },
    {
        'user_id': 2,
        'title': 'Итоги 2019 года',
        'description': 'Отчет об итогах голосования на годовом Общем собрании акционеров ПАО «РусГидро» (ГОСА) 28 июня 2019 года...',
        'image': postsImages[1],
        'tag': 'Итоги',
        'dateAt': '30.12.2019',
        'likes': 24,
        'comments': 7
    },
    {
        'user_id': 2,
        'title': 'Что нас ждет в этом году',
        'description': 'В этом году компания планурет увеличить число закупок на 20% и...',
        'image': postsImages[2],
        'tag': 'Планы',
        'dateAt': '14.01.2020',
        'likes': 89,
        'comments': 14
    },
    {
        'user_id': 3,
        'title': 'Стандартные ошибки при закупках',
        'description': 'Компания Роснано проанализировала ошибки, которые совершаются при...',
        'image': postsImages[3],
        'tag': 'Помощь',
        'dateAt': '21.01.2020',
        'likes': 44,
        'comments': 17
    },
]

def create_user(user):
    sql = """INSERT INTO   users (email, login, password, user_name, contact_name, 
                                    avatar, inn, ogrn, kpp, contracts_all, contracts_made, contracts_canceled, contracts_processing, info )
                     VALUES (%s, %s, %s , %s, %s, %s, %s, %s , %s, %s, %s, %s, %s, %s)
                    ;"""
    record = (user['email'], user['login'], user['password'], user['user_name'], user['contact_name'], user['avatar'],
              user['inn'], user['ogrn'], user['kpp'], user['contracts_all'], user['contracts_made'],
              user['contracts_canceled'], user['contracts_processing'], user['info'])
    cursor.execute(sql, record)
    connection.commit()





def create_posts(post):
    sql = """INSERT INTO   posts (user_id, title, description, image, tag, dateAt, likes, comments)
                     VALUES (%s, %s, %s , %s, %s, %s, %s, %s)
                    ;"""
    record = (post['user_id'], post['title'], post['description'], post['image'], post['tag'], post['dateAt'],
              post['likes'], post['comments'])
    cursor.execute(sql, record)
    connection.commit()


connection, cursor = start_connection()
try:
    for user in users:
        create_user(user)
    for post in posts:
        create_posts(post)

except Exception as e:
    print(e)
finally:
    close_connection(connection, cursor)

connection, cursor = start_connection()
try:
    for post in posts:
        create_posts(post)

except Exception as e:
    print(e)
finally:
    close_connection(connection, cursor)