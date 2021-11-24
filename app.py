from flask import Flask
from main_site.main_site import main_site, experiences_site, projects_site, courses_site, awards_site, contact_site, other_site

app = Flask(__name__)

app.secret_key = "totally secret"

app.register_blueprint(main_site, url_prefix='/')
app.register_blueprint(experiences_site, url_prefix='/')
app.register_blueprint(projects_site, url_prefix='/')
app.register_blueprint(courses_site, url_prefix='/')
app.register_blueprint(awards_site, url_prefix='/')
app.register_blueprint(contact_site, url_prefix='/')
app.register_blueprint(other_site, url_prefix='/')

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8000)