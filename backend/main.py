from typing import List

from fastapi import Depends, FastAPI, HTTPException
from sqlalchemy.orm import Session

import uvicorn

import crud
import models
import schemas
import insert
from database import SessionLocal, engine

from fastapi.middleware.cors import CORSMiddleware

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

origins = [
    "http://localhost:3000"
    # "http://127.0.0.1:5000/",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def return_db():
    return SessionLocal()

# #comment out fallowing function to fill database with premade data
# @app.on_event("startup")
# def startup_event():
#     insert.insert_doctors()
#     insert.insert_patients()
#     insert.insert_medications()
#     insert.insert_pharmacies()
#     insert.insert_pharmacists()
#     insert.insert_stocks()

# patient ---------------------------------------------------------------------------------

#insert new patient
@app.post("/patients/", response_model=schemas.Patient)
def create_patient(patient: schemas.Patient, db: Session = Depends(get_db)):
    db_patient = crud.get_patient(db, patient.Patient_ID)
    if db_patient:
        raise HTTPException(status_code=400, detail="Patient already exists")
    return crud.create_patient(db=db, patient=patient)
#delete patient with specific id
@app.delete("/patients/{patient_id}")
def delete_patient(patient_id: int, db: Session = Depends(get_db)):
    db_patient = crud.get_patient(db, patient_id)
    if db_patient is None:
        raise HTTPException(status_code=404, detail="Patient not found")
    crud.delete_patient(db, patient_id)
    return
#select patient with specific id
@app.get("/patients/{patient_id}", response_model=schemas.Patient)
def get_patient(patient_id: int, db: Session = Depends(get_db)):
    db_patient = crud.get_patient(db, patient_id)
    if db_patient is None:
        raise HTTPException(status_code=404, detail="Patient not found")
    return db_patient
#update patient with specific id
@app.put("/patients/{patient_id}", response_model=schemas.Patient)
def update_patient(patient_id: int, patient: schemas.Patient, db: Session = Depends(get_db)):
    db_patient = crud.get_patient(db, patient_id)
    if db_patient is None:
        raise HTTPException(status_code=404, detail="Patient not found")
    return crud.update_patient(db=db, patient_id=patient_id, patient=patient)

# doctor ---------------------------------------------------------------------------------

#insert new doctor
@app.post("/doctors/", response_model=schemas.Doctor)
def create_doctor(doctor: schemas.Doctor, db: Session = Depends(get_db)):
    db_doctor = crud.get_doctor(db, doctor.Doctor_ID)
    if db_doctor:
        raise HTTPException(status_code=400, detail="Doctor already exists")
    return crud.create_doctor(db=db, doctor=doctor)
#delete doctor with specific id
@app.delete("/doctors/{doctor_id}")
def delete_doctor(doctor_id: int, db: Session = Depends(get_db)):
    db_doctor = crud.get_doctor(db, doctor_id)
    if db_doctor is None:
        raise HTTPException(status_code=404, detail="Doctor not found")
    crud.delete_doctor(db, doctor_id)
    return
#select doctor with specific id
@app.get("/doctors/{doctor_id}", response_model=schemas.Doctor)
def get_doctor(doctor_id: int, db: Session = Depends(get_db)):
    db_doctor = crud.get_doctor(db, doctor_id)
    if db_doctor is None:
        raise HTTPException(status_code=404, detail="Doctor not found")
    return db_doctor
#update doctor with specific id
@app.put("/doctors/{doctor_id}", response_model=schemas.Doctor)
def update_doctor(doctor_id: int, doctor: schemas.Doctor, db: Session = Depends(get_db)):
    db_doctor = crud.get_doctor(db, doctor_id)
    if db_doctor is None:
        raise HTTPException(status_code=404, detail="Doctor not found")
    return crud.update_doctor(db=db, doctor_id=doctor_id, doctor=doctor)

# pharmacy ---------------------------------------------------------------------------------

#insert new pharmacy
@app.post("/pharmacies/", response_model=schemas.Pharmacy)
def create_pharmacy(pharmacy: schemas.Pharmacy, db: Session = Depends(get_db)):
    db_pharmacy = crud.get_pharmacy(db, pharmacy.Pharm_ID)
    if db_pharmacy:
        raise HTTPException(status_code=400, detail="Pharmacy already exists")
    return crud.create_pharmacy(db=db, pharmacy=pharmacy)
#delete pharmacy with specific id
@app.delete("/pharmacies/{pharmacy_id}")
def delete_pharmacy(pharmacy_id: int, db: Session = Depends(get_db)):
    db_pharmacy = crud.get_pharmacy(db, pharmacy_id)
    if db_pharmacy is None:
        raise HTTPException(status_code=404, detail="Pharmacy not found")
    crud.delete_pharmacy(db, pharmacy_id)
    return
#select pharmacy with specific id
@app.get("/pharmacies/{pharmacy_id}", response_model=schemas.Pharmacy)
def get_pharmacy(pharmacy_id: int, db: Session = Depends(get_db)):
    db_pharmacy = crud.get_pharmacy(db, pharmacy_id)
    if db_pharmacy is None:
        raise HTTPException(status_code=404, detail="Pharmacy not found")
    return db_pharmacy
#update pharmacy with specific id
@app.put("/pharmacies/{pharmacy_id}", response_model=schemas.Pharmacy)
def update_pharmacy(pharmacy_id: int, pharmacy: schemas.Pharmacy, db: Session = Depends(get_db)):
    db_pharmacy = crud.get_pharmacy(db, pharmacy_id)
    if db_pharmacy is None:
        raise HTTPException(status_code=404, detail="Pharmacy not found")
    return crud.update_pharmacy(db=db, pharmacy_id=pharmacy_id, pharmacy=pharmacy)

# medication ---------------------------------------------------------------------------------

#insert new medication
@app.post("/medications/", response_model=schemas.Medication)
def create_medication(medication: schemas.Medication, db: Session = Depends(get_db)):
    db_medication = crud.get_medication(db, medication.Med_ID)
    if db_medication:
        raise HTTPException(status_code=400, detail="Medication already exists")
    return crud.create_medication(db=db, medication=medication)
#delete medication with specific id
@app.delete("/medications/{medication_id}")
def delete_medication(medication_id: int, db: Session = Depends(get_db)):
    db_medication = crud.get_medication(db, medication_id)
    if db_medication is None:
        raise HTTPException(status_code=404, detail="Medication not found")
    crud.delete_medication(db, medication_id)
    return
#select medication with specific id
@app.get("/medications/{medication_id}", response_model=schemas.Medication)
def get_medication(medication_id: int, db: Session = Depends(get_db)):
    db_medication = crud.get_medication(db, medication_id)
    if db_medication is None:
        raise HTTPException(status_code=404, detail="Medication not found")
    return db_medication
#update medication with specific id
@app.put("/medications/{medication_id}", response_model=schemas.Medication)
def update_medication(medication_id: int, medication: schemas.Medication, db: Session = Depends(get_db)):
    db_medication = crud.get_medication(db, medication_id)
    if db_medication is None:
        raise HTTPException(status_code=404, detail="Medication not found")
    return crud.update_medication(db=db, medication_id=medication_id, medication=medication)

# prescription ---------------------------------------------------------------------------------

#insert new prescription
@app.post("/prescriptions/", response_model=schemas.Prescription)
def create_prescription(prescription: schemas.Prescription, db: Session = Depends(get_db)):
    db_prescription = crud.get_prescription(db, prescription.Prescription_ID)
    if db_prescription:
        raise HTTPException(status_code=400, detail="Prescription already exists")
    return crud.create_prescription(db=db, prescription=prescription)
#delete prescription with specific id
@app.delete("/prescriptions/{prescription_id}")
def delete_prescription(prescription_id: int, db: Session = Depends(get_db)):
    db_prescription = crud.get_prescription(db, prescription_id)
    if db_prescription is None:
        raise HTTPException(status_code=404, detail="Prescription not found")
    crud.delete_prescription(db, prescription_id)
    return
#select prescription with specific id
@app.get("/prescriptions/{prescription_id}", response_model=schemas.Prescription)
def get_prescription(prescription_id: int, db: Session = Depends(get_db)):
    db_prescription = crud.get_prescription(db, prescription_id)
    if db_prescription is None:
        raise HTTPException(status_code=404, detail="Prescription not found")
    return db_prescription
#update prescription with specific id
@app.put("/prescriptions/{prescription_id}", response_model=schemas.Prescription)
def update_prescription(prescription_id: int, prescription: schemas.Prescription, db: Session = Depends(get_db)):
    db_prescription = crud.get_prescription(db, prescription_id)
    if db_prescription is None:
        raise HTTPException(status_code=404, detail="Prescription not found")
    return crud.update_prescription(db=db, prescription_id=prescription_id, prescription=prescription)

# manufacturer ---------------------------------------------------------------------------------

#insert new manufacturer
@app.post("/manufacturers/", response_model=schemas.Manufacturer)
def create_manufacturer(manufacturer: schemas.Manufacturer, db: Session = Depends(get_db)):
    db_manufacturer = crud.get_manufacturer(db, manufacturer.Manu_Name)
    if db_manufacturer:
        raise HTTPException(status_code=400, detail="Manufacturer already exists")
    return crud.create_manufacturer(db=db, manufacturer=manufacturer)
#delete manufacturer with name
@app.delete("/manufacturers/{Manu_Name}")
def delete_manufacturer(Manu_Name: str, db: Session = Depends(get_db)):
    db_manufacturer = crud.get_manufacturer(db, Manu_Name)
    if db_manufacturer is None:
        raise HTTPException(status_code=404, detail="Manufacturer not found")
    crud.delete_manufacturer(db, Manu_Name)
    return
#select manufacturer with specific id
@app.get("/manufacturers/{manufacturer_id}", response_model=schemas.Manufacturer)
def get_manufacturer(Manu_Name: str, db: Session = Depends(get_db)):
    db_manufacturer = crud.get_manufacturer(db, Manu_Name)
    if db_manufacturer is None:
        raise HTTPException(status_code=404, detail="Manufacturer not found")
    return db_manufacturer
#update manufacturer with specific id
@app.put("/manufacturers/{manufacturer_id}", response_model=schemas.Manufacturer)
def update_manufacturer(Manu_Name: str, manufacturer: schemas.Manufacturer, db: Session = Depends(get_db)):
    db_manufacturer = crud.get_manufacturer(db, Manu_Name)
    if db_manufacturer is None:
        raise HTTPException(status_code=404, detail="Manufacturer not found")
    return crud.update_manufacturer(db, Manu_Name, manufacturer)

# stock ---------------------------------------------------------------------------------

#insert new stock
@app.post("/stocks/", response_model=schemas.Stock)
def create_stock(stock: schemas.Stock, db: Session = Depends(get_db)):
    db_stock = crud.get_stock(db, stock.Stock_Key)
    if db_stock:
        raise HTTPException(status_code=400, detail="Stock already exists")
    return crud.create_stock(db=db, stock=stock)
#delete stock with specific id
@app.delete("/stocks/{stock_id}")
def delete_stock(stock_id: int, db: Session = Depends(get_db)):
    db_stock = crud.get_stock(db, stock_id)
    if db_stock is None:
        raise HTTPException(status_code=404, detail="Stock not found")
    crud.delete_stock(db, stock_id)
    return
#select stock with specific id
@app.get("/stocks/{stock_id}", response_model=schemas.Stock)
def get_stock(stock_id: int, db: Session = Depends(get_db)):
    db_stock = crud.get_stock(db, stock_id)
    if db_stock is None:
        raise HTTPException(status_code=404, detail="Stock not found")
    return db_stock
#update stock with specific id
@app.put("/stocks/{stock_id}", response_model=schemas.Stock)
def update_stock(stock_id: int, stock: schemas.Stock, db: Session = Depends(get_db)):
    db_stock = crud.get_stock(db, stock_id)
    if db_stock is None:
        raise HTTPException(status_code=404, detail="Stock not found")
    return crud.update_stock(db, stock_id, stock)

# Pharmacist ---------------------------------------------------------------------------------
#create new pharmacist
@app.post("/pharmacists/", response_model=schemas.Pharmacist)
def create_pharmacist(pharmacist: schemas.Pharmacist, db: Session = Depends(get_db)):
    db_pharmacist = crud.get_pharmacist(db, pharmacist.Pharmacist_ID)
    if db_pharmacist:
        raise HTTPException(status_code=400, detail="Pharmacist already exists")
    return crud.create_pharmacist(db, pharmacist)

#delete pharmacist with specific id
@app.delete("/pharmacists/{pharmacist_id}")
def delete_pharmacist(pharmacist_id: int, db: Session = Depends(get_db)):
    db_pharmacist = crud.get_pharmacist(db, pharmacist_id)
    if db_pharmacist is None:
        raise HTTPException(status_code=404, detail="Pharmacist not found")
    crud.delete_pharmacist(db, pharmacist_id)
    return

#select pharmacist with specific id
@app.get("/pharmacists/{pharmacist_id}", response_model=schemas.Pharmacist)
def get_pharmacist(pharmacist_id: int, db: Session = Depends(get_db)):
    db_pharmacist = crud.get_pharmacist(db, pharmacist_id)
    if db_pharmacist is None:
        raise HTTPException(status_code=404, detail="Pharmacist not found")
    return db_pharmacist

#update pharmacist with specific id
@app.put("/pharmacists/{pharmacist_id}", response_model=schemas.Pharmacist)
def update_pharmacist(pharmacist_id: int, pharmacist: schemas.Pharmacist, db: Session = Depends(get_db)):
    db_pharmacist = crud.get_pharmacist(db, pharmacist_id)
    if db_pharmacist is None:
        raise HTTPException(status_code=404, detail="Pharmacist not found")
    return crud.update_pharmacist(db, pharmacist_id, pharmacist)

# special statements ---------------------------------------------------------------------------------

#retrieve all the patients for a specific doctor given the foreign key for the doctor in the patient table
#url to retrieve all patients for a specific doctor
@app.get("/patients/doctor/{doctor_id}", response_model=List[schemas.Patient])
def get_patients_for_doctor(doctor_id: int, db: Session = Depends(get_db)):
    db_patients = crud.get_patients_for_doctor(db, doctor_id)
    if db_patients is None:
        raise HTTPException(status_code=404, detail="Patients not found")
    return db_patients

#retrieve all pharmaciews that have a given Medication_ID where the stock is greater than 0
#url to retrieve all pharmacies that have a given Medication_ID where the stock is greater than 0
@app.get("/pharmacies/medication/{Medication_ID}", response_model=List[schemas.Pharmacy])
def get_pharmacies_with_stock(Medication_ID: int, db: Session = Depends(get_db)):
    db_pharmacies = crud.get_pharmacies_with_stock(db, Medication_ID)
    if db_pharmacies is None:
        raise HTTPException(status_code=404, detail="Pharmacies not found")
    return db_pharmacies

#retrieve all pharmacists who work at a given pharmacy
#url to retrieve all pharmacists who work at a given pharmacy
@app.get("/pharmacists/pharmacy/{Pharmacy_ID}", response_model=List[schemas.Pharmacist])
def get_pharmacists_for_pharmacy(Pharmacy_ID: int, db: Session = Depends(get_db)):
    db_pharmacists = crud.get_pharmacists_for_pharmacy(db, Pharmacy_ID)
    if db_pharmacists is None:
        raise HTTPException(status_code=404, detail="Pharmacists not found")
    return db_pharmacists

#retrieve all patients who have a prescription related to a given pharmacist ID
#url to retrieve all patients who have a prescription related to a given pharmacist ID
@app.get("/patients/pharmacist/{Pharmacist_ID}", response_model=List[schemas.Patient])
def get_patients_for_pharmacist(Pharmacist_ID: int, db: Session = Depends(get_db)):
    db_patients = crud.get_patients_for_pharmacist(db, Pharmacist_ID)
    if db_patients is None:
        raise HTTPException(status_code=404, detail="Patients not found")
    return db_patients

#retrieve all prescriptions related to a given patientID
#url to retrieve all prescriptions related to a given patientID
@app.get("/prescriptions/patient/{Patient_ID}", response_model=List[schemas.Prescription])
def get_prescriptions_for_patient(Patient_ID: int, db: Session = Depends(get_db)):
    db_prescriptions = crud.get_prescriptions_for_patient(db, Patient_ID)
    if db_prescriptions is None:
        raise HTTPException(status_code=404, detail="Prescriptions not found")
    return db_prescriptions

#retieve all prescriptions related to a given pharmacistID
#url to retieve all prescriptions related to a given pharmacistID
@app.get("/prescriptions/pharmacist/{Pharmacist_ID}", response_model=List[schemas.Prescription])
def get_prescriptions_for_pharmacist(Pharmacist_ID: int, db: Session = Depends(get_db)):
    db_prescriptions = crud.get_prescriptions_for_pharmacist(db, Pharmacist_ID)
    if db_prescriptions is None:
        raise HTTPException(status_code=404, detail="Prescriptions not found")
    return db_prescriptions

#retrieve all medications
@app.get("/medications/", response_model=List[schemas.Medication])
def get_all_medications(db: Session = Depends(get_db)):
    db_medications = crud.get_all_medications(db)
    if db_medications is None:
        raise HTTPException(status_code=404, detail="Medications not found")
    return db_medications

# All the get statements ---------------------------------------------------------------------------------

#retrieve all pharmacies
@app.get("/pharmacies/", response_model=List[schemas.Pharmacy])
def get_all_pharmacies(db: Session = Depends(get_db)):
    db_pharmacies = crud.get_all_pharmacies(db)
    if db_pharmacies is None:
        raise HTTPException(status_code=404, detail="Pharmacies not found")
    return db_pharmacies

#retrieve all patients
@app.get("/patients/", response_model=List[schemas.Patient])
def get_all_patients(db: Session = Depends(get_db)):
    db_patients = crud.get_all_patients(db)
    if db_patients is None:
        raise HTTPException(status_code=404, detail="Patients not found")
    return db_patients

#retrieve all doctors
@app.get("/doctors/", response_model=List[schemas.Doctor])
def get_all_doctors(db: Session = Depends(get_db)):
    db_doctors = crud.get_all_doctors(db)
    if db_doctors is None:
        raise HTTPException(status_code=404, detail="Doctors not found")
    return db_doctors

#retrieve all prescriptions
@app.get("/prescriptions/", response_model=List[schemas.Prescription])
def get_all_prescriptions(db: Session = Depends(get_db)):
    db_prescriptions = crud.get_all_prescriptions(db)
    if db_prescriptions is None:
        raise HTTPException(status_code=404, detail="Prescriptions not found")
    return db_prescriptions

if __name__ == "__main__":
        uvicorn.run(app, port=5000, log_level="info")


"""
bug with get patients for doctor and get pharmcaiists for pharmacy
    - returns wrong results for some inputs
"""