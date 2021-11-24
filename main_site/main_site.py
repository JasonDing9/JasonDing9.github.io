from flask import Blueprint, render_template
import random


main_site = Blueprint("main_site", __name__, 
    template_folder="templates", 
    static_folder="static", 
    static_url_path="/main_site/static" 
)

experiences_site = Blueprint("experiences_site", __name__, 
    template_folder="templates", 
    static_folder="static", 
    static_url_path="/main_site/static" 
)

projects_site = Blueprint("projects_site", __name__, 
    template_folder="templates", 
    static_folder="static", 
    static_url_path="/main_site/static" 
)

courses_site = Blueprint("courses_site", __name__, 
    template_folder="templates", 
    static_folder="static", 
    static_url_path="/main_site/static" 
)

awards_site = Blueprint("awards_site", __name__, 
    template_folder="templates", 
    static_folder="static", 
    static_url_path="/main_site/static" 
)

contact_site = Blueprint("contact_site", __name__, 
    template_folder="templates", 
    static_folder="static", 
    static_url_path="/main_site/static" 
)

other_site = Blueprint("other_site", __name__, 
    template_folder="templates", 
    static_folder="static", 
    static_url_path="/main_site/static" 
)

veggies = ["lettuce", "beets", "broccoli", "brussel sprouts" ]
sweets = ["chocolate chip cookies", "chocolate cake", "ice cream", "jelly beans", "snickerdoodles"]
sweets2 = ["gummy bears", "gummy worms", "cotton candy", "taffy"]

@main_site.route("/")
def index():
    return render_template("main_index.html", veggie = random.choice(veggies), sweet = random.choice(sweets), sweet2 = random.choice(sweets2))

@experiences_site.route("/experiences")
def index():
    return render_template("experiences.html")

@projects_site.route("/projects")
def index():
    return render_template("projects.html")

@courses_site.route("/courses")
def index():
    return render_template("courses.html")

@awards_site.route("/awards")
def index():
    return render_template("awards.html")

@contact_site.route("/contact")
def index():
    return render_template("contact.html")

@other_site.route("/other")
def index():
    return render_template("other.html")