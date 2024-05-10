from flask import Flask, render_template, request, jsonify
import firebase_admin
from datetime import datetime
from firebase_admin import credentials, db, storage
import os
# Initialize Firebase Admin SDK with your service account credentials
cred = credentials.Certificate(
    "servicekey.json")  # Replace with your service account key
firebase_admin.initialize_app(
    cred, {
        'databaseURL':'https://makranamarble-68878-default-rtdb.asia-southeast1.firebasedatabase.app/',
        'storageBucket': 'makranamarble-68878.appspot.com'
    })

# Get a reference to the Firebase Realtime Database
ref = db.reference('/')
storage_client = storage.bucket()







app = Flask(__name__)


# apiToAddWorkers?name=raju&number=45&description=dfg&pswd=gwe
@app.route('/apiToAddWorkers', methods=['GET'])
def get_params():
    # Get the parameters from the request query string
    name = request.args.get('name')
    number = request.args.get('number')
    description = request.args.get('description')
    pswd = request.args.get('pswd')

    # Check if all parameters are received
    try:
        data = {
            "name": name,
            "number": number,
            "description": description,
            "pswd": pswd
        }
        ref.child("workerlist").push(data)
        # Return a JSON response indicating success
        return jsonify({'success': True}), 200
    except:
        # Return a JSON response indicating failure
        return jsonify({'success': False, 'message': 'One or more parameters missing.'}), 400





@app.route('/')
def hello():
    return render_template('hello.html')

@app.route('/adminpage', methods=['POST'])
def adminpage():
    if request.method == 'POST':
        # Access form data
        userid = request.form['userid']
        pswd = request.form['pswd']
        print(userid, pswd)
        get_data = ref.child("adminlist").get()  # Assuming you've already set up Firebase reference

        if get_data:
            for user_data in get_data.values(
            ):  # Iterate over the values since user IDs are not keys
                user_id = user_data.get('userid')
                password = user_data.get('pwd')
                if user_id == userid and password == pswd:
                    print("Admin credentials found in the database.")
                    return render_template("admin.html")
                    # Perform actions for admin login
                    break
            else:
                print("Admin credentials not found in the database.")
        else:
            print("No data retrieved from Firebase.")


@app.route('/workerpage', methods=['POST'])
def workerpage():
    if request.method == 'POST':
        # Access form data
        number = request.form['number']
        pswd = request.form['pswd']
        get_data = ref.child("workerlist").get()

        if get_data:
            for user_key, user_data in get_data.items():
                # Iterate over the values since user IDs are not keys
                numberfromdata = user_data.get('number')
                pswdfromdata = user_data.get('pswd')
                if numberfromdata == number and pswdfromdata == pswd:
                    print("Admin credentials found in the database.")
                    return render_template("worker.html", user_key=user_key)
                    # Perform actions for admin login
                    break
            else:
                print("Admin credentials not found in the database.")
        else:
            print("No data retrieved from Firebase.")
        

@app.route('/success', methods=['POST'])
def success():
    if request.method == 'POST':
        sname = request.form['sname']
        brand = request.form['brand']
        size = request.form['size']
        category = request.form['category']
        weight = request.form['weight']
        pcsperbox = request.form['pcsperbox']
        sqrft = request.form['sqrft']
        unit = request.form['unit']
        godam1 = request.form['godam1']
        godam2 = request.form['godam2']
        color = request.form['color']
        image = request.files['image']
        print(sname, brand, size, category, weight, pcsperbox, sqrft, unit, godam1, godam2, color)
        
        data = {
            "sname": sname,
            "brand": brand,
            "size": size,
            "category": category,
            "weight": weight,
            "pcsperbox": pcsperbox,
            "sqrft": sqrft,
            "unit": unit,
            "godam1": godam1,
            "godam2": godam2,
            "color": color
            
        }
        val=ref.child("stocklist").push(data)
        print(val.key)
        blob = storage_client.blob(f"stockimg/{val.key}.jpg")
        blob.upload_from_file(image)

        # Make the blob publicly accessible (if needed)
        blob.make_public()

        # Retrieve the public URL of the uploaded file
        file_url = blob.public_url

        # Print the URL
        print("File uploaded to:", file_url)

        return render_template("worker.html")


@app.route('/apiToGetAvailableStocks', methods=['GET'])
def apiToGetAvailableStocks():
    # Get the data from Firebase
    data = ref.child("stocklist").get()
    # Return the data as JSON with a status code of 200
    return jsonify(data), 200

@app.route('/geteditworker', methods=['GET'])
def geteditworker():
    # Get the data from Firebase
    data = ref.child("workerlist").get()
    # Return the data as JSON with a status code of 200
    return jsonify(data), 200

@app.route('/getstockdetailbyid', methods=['GET'])
def getstockdetailbyid():
    id = request.args.get('id')
    # Get the data from Firebase
    data = ref.child("stocklist").child(id).get()
    # Return the data as JSON with a status code of 200
    return jsonify(data), 200

@app.route('/actioneditstockapi', methods=['GET'])
def actioneditstockapi():
    id = request.args.get('id')
    userkey= request.args.get("userkey")
    godam1= request.args.get("godam1")
    godam2= request.args.get("godam2")
    actiontype= request.args.get("act")
    editgodam1= request.args.get("editgodam1")
    editgodam2= request.args.get("editgodam2")
    description= request.args.get("description")

    print(id , userkey , godam1, godam2, actiontype)
    # Get the data from Firebase
# http://127.0.0.1:5000/actioneditstockapi?id=-NxMzHipitIeyYYf0zsW&userkey=-NxMeqjrGyfN2SRrnsqw&godam1=50&godam2=123&act=add&editgodam1=3&editgodam2=2    

    data = {
        "godam1": godam1,
        "godam2": godam2
    }
    date=str(datetime.now().date())
    ref.child("stocklist").child(id).update(data)
    dataforactlist={
        "stockid": id,
        "userkey": userkey,
        "actiontype": actiontype,
        "editgodam1":editgodam1,
        "editgodam2": editgodam2,
        "description": description,
        "date": date 
    }
    ref.child("actionlist").push(dataforactlist)
    flag = {
        "success": True
    }
    # Return the data as JSON with a status code of 200
    return jsonify(flag), 200












@app.route('/getactionlistapi', methods=['GET'])
def getactionlistapi():
    
    # Get the data from Firebase
    data = ref.child("actionlist").get()
    newdata={

    }
    for node_id, node_data in data.items():
        stock_id = node_data["stockid"]
        stock_data=ref.child("stocklist").child(stock_id).get()
        node_data["sname"] = stock_data["sname"]
        node_data["brand"] = stock_data["brand"]
        node_data["category"] = stock_data["category"]
        node_data["godam1"] = stock_data["godam1"]
        node_data["godam2"] = stock_data["godam2"]
        node_data["pcsperbox"] = stock_data["pcsperbox"]
        node_data["size"] = stock_data["size"]
        node_data["sqrft"] = stock_data["sqrft"]
        node_data["unit"] = stock_data["unit"]
        node_data["weight"] = stock_data["weight"]

        newdata[node_id] = node_data
        # print(stock_data['sname'])
        # print(f"Node ID: {node_id}, Stock ID: {stock_id}")
    for node_id, node_data in data.items():
        user_key = node_data["userkey"]
        user_data=ref.child("workerlist").child(user_key).get()
        node_data["name"] = user_data["name"]
        node_data["usernumber"] = user_data["number"]
        newdata[node_id] = node_data
    # Return the data as JSON with a status code of 200
    return jsonify(newdata), 200

@app.route('/getworker', methods=['GET'])
def getworker():
    id = request.args.get('id')
    # Get the data from Firebase
    data = ref.child("workerlist").child(id).get()
    # Return the data as JSON with a status code of 200
    return jsonify(data), 200

