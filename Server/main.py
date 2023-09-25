from flask import Flask, request
import os


app = Flask(
    __name__,
    static_folder='statics',
    static_url_path='',
    template_folder='public'
)
app.config['secret'] = 'SECRET_KEY_HERE'
app.config['UPLOAD_FOLDER'] = 'Uploads'


@app.errorhandler(404)
def handlePageMissing(e):
    return f'<strong>{e}</strong>'


@app.route('/')
def home():
    return "<h1>Welcome to HOMEPAGE</h1>"


@app.route("/upload", methods=['GET', 'POST'])
def upload():
    if not request.method == 'POST':
        return "Please USE POST request to call endpoint 'UPLOAD'"

    file = request.files.get('file', None)
    if not file:
        return "Please send valid image"

    UPLOAD_FOLDER = app.config['UPLOAD_FOLDER']
    if not os.path.exists(UPLOAD_FOLDER):
        os.makedirs(UPLOAD_FOLDER)
    print("Analysing", file.filename)

    file.save(f"{UPLOAD_FOLDER}/{file.name}")
    return "success"


if __name__ == '__main__':
    app.run(host="0.0.0.0", debug=True)
