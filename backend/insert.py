#take the data in doctors.json and insert it into the database
import json
import sqlite3
import main

#take the data in pharmacies.json and insert it into the database
def insert_pharmacies():
    conn = sqlite3.connect('sql_app.db')
    c = conn.cursor()
    with open('backend/pharmacies.json') as f:
        pharmacy = json.load(f)
    for i in range(len(pharmacy['pharmacies'])):
        c.execute("INSERT INTO PHARMACY VALUES (?,?,?,?,?)", (pharmacy['pharmacies'][i]['Pharm_ID'], pharmacy['pharmacies'][i]['Name'], pharmacy['pharmacies'][i]['City'], pharmacy['pharmacies'][i]['State'], pharmacy['pharmacies'][i]['Country']))
    conn.commit()
    conn.close()

#take the data in doctors.json and insert it into the database
def insert_doctors():
    conn = sqlite3.connect('sql_app.db')
    c = conn.cursor()
    with open('backend/doctors.json') as f:
        data = json.load(f)
    for i in range(len(data['doctors'])):
        c.execute("INSERT INTO DOCTOR VALUES (?,?,?,?,?)", (data['doctors'][i]['Doctor_ID'], data['doctors'][i]['FirstName'], data['doctors'][i]['MiddleInit'], data['doctors'][i]['LastName'], data['doctors'][i]['OfficeAddress']))
    conn.commit()
    conn.close()

#take the data in patients.json and insert it into the database
def insert_patients():
    conn = sqlite3.connect('sql_app.db')
    c = conn.cursor()
    with open('backend/patients.json') as f:
        data = json.load(f)
    for i in range(len(data['patients'])):
        c.execute("INSERT INTO PATIENT VALUES (?,?,?,?,?,?,?,?,?,?,?)", (data['patients'][i]['Patient_ID'], data['patients'][i]['FirstName'], data['patients'][i]['MiddleInit'], data['patients'][i]['LastName'], data['patients'][i]['Street'], data['patients'][i]['City'], data['patients'][i]['State'], data['patients'][i]['DOB'], data['patients'][i]['Age'], data['patients'][i]['Sex'], data['patients'][i]['Doctor_Doctor_ID']))
    conn.commit()
    conn.close()

#take the data in medications.json and insert it into the database
def insert_medications():
    conn = sqlite3.connect('sql_app.db')
    c = conn.cursor()
    with open('backend/medications.json') as f:
        data = json.load(f)
    for i in range(len(data['medications'])):
        c.execute("INSERT INTO MEDICATION VALUES (?,?,?)", (data['medications'][i]['Med_ID'], data['medications'][i]['Med_Name'], data['medications'][i]['Manu_Dosage']))
    conn.commit()
    conn.close()

#take the data in pharmacists.json and insert it into the database
def insert_pharmacists():
    conn = sqlite3.connect('sql_app.db')
    c = conn.cursor()
    with open('backend/pharmacists.json') as f:
        data = json.load(f)
    for i in range(len(data['pharmacists'])):
        c.execute("INSERT INTO PHARMACIST VALUES (?,?,?,?,?)", (data['pharmacists'][i]['Pharmacist_ID'], data['pharmacists'][i]['FirstName'], data['pharmacists'][i]['MiddleInit'], data['pharmacists'][i]['LastName'], data['pharmacists'][i]['Pharmacist_Pharmacy_ID']))
    conn.commit()
    conn.close()

#take the data in stocks.json and insert it into the database
def insert_stocks():
    conn = sqlite3.connect('sql_app.db')
    c = conn.cursor()
    with open('backend/stock.json') as f:
        data = json.load(f)
    for i in range(len(data['stock'])):
        c.execute("INSERT INTO STOCK VALUES (?,?,?,?,?)", (data['stock'][i]['Stock_Key'], data['stock'][i]['Stock_ID'], data['stock'][i]['Stock'], data['stock'][i]['DateUntilNextShipment'], data['stock'][i]['Pharm_Pharm_ID']))
    conn.commit()
    conn.close()
    
