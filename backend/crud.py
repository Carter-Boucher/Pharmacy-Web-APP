from sqlalchemy.orm import Session

import models
import schemas

# patient ---------------------------------------------------------------------------------

#insert new patient
def create_patient(db: Session, patient: schemas.Patient):
    db_patient = models.Patient(
        Patient_ID = patient.Patient_ID,
        FirstName = patient.FirstName,
        MiddleInit = patient.MiddleInit,
        LastName = patient.LastName,
        Street = patient.Street,
        City = patient.City,
        State = patient.State,
        DOB = patient.DOB,
        Age = patient.Age,
        Sex = patient.Sex,
        Doctor_Doctor_ID = patient.Doctor_Doctor_ID,
    )
    db.add(db_patient)
    db.commit()
    db.refresh(db_patient)
    return db_patient
#delete patient with specific id
def delete_patient(db: Session, patient_id: int):
    db.query(models.Patient).filter(models.Patient.Patient_ID == patient_id).delete()
    db.commit()
    return
#select patient with specific id
def get_patient(db: Session, patient_id: int):
    return db.query(models.Patient).filter(models.Patient.Patient_ID == patient_id).first()
#update patient with specific id
def update_patient(db: Session, patient_id: int, patient: schemas.Patient):
    db_patient = db.query(models.Patient).filter(models.Patient.Patient_ID == patient_id).first()
    db_patient.FirstName = patient.FirstName
    db_patient.MiddleInit = patient.MiddleInit
    db_patient.LastName = patient.LastName
    db_patient.Street = patient.Street
    db_patient.City = patient.City
    db_patient.State = patient.State
    db_patient.DOB = patient.DOB
    db_patient.Age = patient.Age
    db_patient.Sex = patient.Sex
    db_patient.Doctor_Doctor_ID = patient.Doctor_Doctor_ID
    db.commit()
    db.refresh(db_patient)
    return db_patient

# doctor ---------------------------------------------------------------------------------

#insert new doctor
def create_doctor(db: Session, doctor: schemas.Doctor):
    db_doctor = models.Doctor(
        Doctor_ID = doctor.Doctor_ID,
        FirstName = doctor.FirstName,
        MiddleInit = doctor.MiddleInit,
        LastName = doctor.LastName,
        OfficeAddress = doctor.OfficeAddress
    )
    db.add(db_doctor)
    db.commit()
    db.refresh(db_doctor)
    return db_doctor
#delete doctor with specific id
def delete_doctor(db: Session, doctor_id: int):
    db.query(models.Doctor).filter(models.Doctor.Doctor_ID == doctor_id).delete()
    db.commit()
    return
#select doctor with specific id
def get_doctor(db: Session, doctor_id: int):
    return db.query(models.Doctor).filter(models.Doctor.Doctor_ID == doctor_id).first()
#update doctor with specific id
def update_doctor(db: Session, doctor_id: int, doctor: schemas.Doctor):
    db_doctor = db.query(models.Doctor).filter(models.Doctor.Doctor_ID == doctor_id).first()
    db_doctor.FirstName = doctor.FirstName
    db_doctor.MiddleInit = doctor.MiddleInit
    db_doctor.LastName = doctor.LastName
    db_doctor.OfficeAddress = doctor.OfficeAddress
    db.commit()
    db.refresh(db_doctor)
    return db_doctor

# pharmacy ---------------------------------------------------------------------------------

#insert new pharmacy
def create_pharmacy(db: Session, pharmacy: schemas.Pharmacy):
    db_pharmacy = models.Pharmacy(
        Pharm_ID = pharmacy.Pharm_ID,
        Name = pharmacy.Name,
        City = pharmacy.City,
        State = pharmacy.State,
        Country = pharmacy.Country
    )
    db.add(db_pharmacy)
    db.commit()
    db.refresh(db_pharmacy)
    return db_pharmacy
#delete pharmacy with specific id
def delete_pharmacy(db: Session, pharmacy_id: int):
    db.query(models.Pharmacy).filter(models.Pharmacy.Pharm_ID == pharmacy_id).delete()
    db.commit()
    return
#select pharmacy with specific id
def get_pharmacy(db: Session, pharmacy_id: int):
    return db.query(models.Pharmacy).filter(models.Pharmacy.Pharm_ID == pharmacy_id).first()
#update pharmacy with specific id
def update_pharmacy(db: Session, pharmacy_id: int, pharmacy: schemas.Pharmacy):
    db_pharmacy = db.query(models.Pharmacy).filter(models.Pharmacy.Pharm_ID == pharmacy_id).first()
    db_pharmacy.Name = pharmacy.Name
    db_pharmacy.City = pharmacy.City
    db_pharmacy.State = pharmacy.State
    db_pharmacy.Country = pharmacy.Country
    db.commit()
    db.refresh(db_pharmacy)
    return db_pharmacy

# medication ---------------------------------------------------------------------------------

#insert new medication
def create_medication(db: Session, medication: schemas.Medication):
    db_medication = models.Medication(
        Med_ID = medication.Med_ID,
        Med_Name = medication.Med_Name,
        Manu_Dosage = medication.Manu_Dosage,
    )
    db.add(db_medication)
    db.commit()
    db.refresh(db_medication)
    return db_medication
#delete medication with specific id
def delete_medication(db: Session, medication_id: int):
    db.query(models.Medication).filter(models.Medication.Med_ID == medication_id).delete()
    db.commit()
    return
#select medication with specific id
def get_medication(db: Session, medication_id: int):
    return db.query(models.Medication).filter(models.Medication.Med_ID == medication_id).first()
#update medication with specific id
def update_medication(db: Session, medication_id: int, medication: schemas.Medication):
    db_medication = db.query(models.Medication).filter(models.Medication.Med_ID == medication_id).first()
    db_medication.Med_Name = medication.Med_Name
    db_medication.Manu_Dosage = medication.Manu_Dosage
    db.commit()
    db.refresh(db_medication)
    return db_medication

# prescription ---------------------------------------------------------------------------------

#insert new prescription
def create_prescription(db: Session, prescription: schemas.Prescription):
    db_prescription = models.Prescription(
        Doctor_Doc_ID = prescription.Doctor_Doc_ID,
        Patient_Patient_ID = prescription.Patient_Patient_ID,
        Medication_Med_ID = prescription.Medication_Med_ID,
        Pharmacist_Pharmacist_ID = prescription.Pharmacist_Pharmacist_ID,
        Prescription_ID = prescription.Prescription_ID,
        Date = prescription.Date,
        DosageTime = prescription.DosageTime,
        DosageAmount = prescription.DosageAmount,
        Refillable = prescription.Refillable
    )
    db.add(db_prescription)
    db.commit()
    db.refresh(db_prescription)
    return db_prescription
#delete prescription with specific id
def delete_prescription(db: Session, prescription_id: int):
    db.query(models.Prescription).filter(models.Prescription.Prescription_ID == prescription_id).delete()
    db.commit()
    return
#select prescription with specific id
def get_prescription(db: Session, prescription_id: int):
    return db.query(models.Prescription).filter(models.Prescription.Prescription_ID == prescription_id).first()
#update prescription with specific id
def update_prescription(db: Session, prescription_id: int, prescription: schemas.Prescription):
    db_prescription = db.query(models.Prescription).filter(models.Prescription.Prescription_ID == prescription_id).first()
    db_prescription.Doctor_Doc_ID = prescription.Doctor_Doc_ID
    db_prescription.Patient_Patient_ID = prescription.Patient_Patient_ID
    db_prescription.Medication_Med_ID = prescription.Medication_Med_ID
    db_prescription.Pharmacist_Pharmacist_ID = prescription.Pharmacist_Pharmacist_ID
    db_prescription.Date = prescription.Date
    db_prescription.DosageTime = prescription.DosageTime
    db_prescription.DosageAmount = prescription.DosageAmount
    db_prescription.Refillable = prescription.Refillable
    db.commit()
    db.refresh(db_prescription)
    return db_prescription

# manufacturer ---------------------------------------------------------------------------------

#insert new Manufacturer
def create_manufacturer(db: Session, manufacturer: schemas.Manufacturer):
    db_manufacturer = models.Manufacturer(
        Manu_Name = manufacturer.Manu_Name,
        Manu_Type = manufacturer.Manu_Type,
        AddressState = manufacturer.AddressState,
        AddressCity = manufacturer.AddressCity,
        AddressStreet = manufacturer.AddressStreet,
        City = manufacturer.City,
        State = manufacturer.State,
        Country = manufacturer.Country
    )
    db.add(db_manufacturer)
    db.commit()
    db.refresh(db_manufacturer)
    return db_manufacturer
#delete Manufacturer with specific name
def delete_manufacturer(db: Session, manufacturer_name: str):
    db.query(models.Manufacturer).filter(models.Manufacturer.Manu_Name == manufacturer_name).delete()
    db.commit()
    return
#select Manufacturer with specific name
def get_manufacturer(db: Session, manufacturer_name: str):
    return db.query(models.Manufacturer).filter(models.Manufacturer.Manu_Name == manufacturer_name).first()
#update Manufacturer with specific name
def update_manufacturer(db: Session, manufacturer_name: str, manufacturer: schemas.Manufacturer):
    db_manufacturer = db.query(models.Manufacturer).filter(models.Manufacturer.Manu_Name == manufacturer_name).first()
    db_manufacturer.Manu_Type = manufacturer.Manu_Type
    db_manufacturer.AddressState = manufacturer.AddressState
    db_manufacturer.AddressCity = manufacturer.AddressCity
    db_manufacturer.AddressStreet = manufacturer.AddressStreet
    db_manufacturer.City = manufacturer.City
    db_manufacturer.State = manufacturer.State
    db_manufacturer.Country = manufacturer.Country
    db.commit()
    db.refresh(db_manufacturer)
    return db_manufacturer

# stock ---------------------------------------------------------------------------------

#insert new stock
def create_stock(db: Session, stock: schemas.Stock):
    db_stock = models.Stock(
        Stock_Key = stock.Stock_Key,
        Stock_ID = stock.Stock_ID,
        Stock = stock.Stock,
        DateUntilNextShipment = stock.DateUntilNextShipment,
        Pharm_Pharm_ID = stock.Pharm_Pharm_ID
    )
    db.add(db_stock)
    db.commit()
    db.refresh(db_stock)
    return db_stock
#delete stock with specific id
def delete_stock(db: Session, stock_id: int):
    db.query(models.Stock).filter(models.Stock.Stock_Key == stock_id).delete()
    db.commit()
    return
#select stock with specific id
def get_stock(db: Session, Medication_ID: int):
    return db.query(models.Stock).filter(models.Stock.Stock_Key == Medication_ID).first()
#update stock with specific id
def update_stock(db: Session, Medication_ID: int, stock: schemas.Stock):
    db_stock = db.query(models.Stock).filter(models.Stock.Stock_Key == Medication_ID).first()
    db_stock.Stock_ID = stock.Stock_ID
    db_stock.Stock = stock.Stock
    db_stock.DateUntilNextShipment = stock.DateUntilNextShipment
    db_stock.Pharm_Pharm_ID = stock.Pharm_Pharm_ID
    db.commit()
    db.refresh(db_stock)
    return db_stock

# pharmacist ---------------------------------------------------------------------------------

#create new pharmacist
def create_pharmacist(db: Session, pharmacist: schemas.Pharmacist):
    db_pharmacist = models.Pharmacist(
        Pharmacist_ID = pharmacist.Pharmacist_ID,
        FirstName = pharmacist.FirstName,
        MiddleInit = pharmacist.MiddleInit,
        LastName = pharmacist.LastName,
        Pharmacist_Pharmacy_ID = pharmacist.Pharmacist_Pharmacy_ID,
    )
    db.add(db_pharmacist)
    db.commit()
    db.refresh(db_pharmacist)
    return db_pharmacist
#delete pharmacist with specific id
def delete_pharmacist(db: Session, pharmacist_id: int):
    db.query(models.Pharmacist).filter(models.Pharmacist.Pharmacist_ID == pharmacist_id).delete()
    db.commit()
    return
#select pharmacist with specific id
def get_pharmacist(db: Session, pharmacist_id: int):
    return db.query(models.Pharmacist).filter(models.Pharmacist.Pharmacist_ID == pharmacist_id).first()
#update pharmacist with specific id
def update_pharmacist(db: Session, pharmacist_id: int, pharmacist: schemas.Pharmacist):
    db_pharmacist = db.query(models.Pharmacist).filter(models.Pharmacist.Pharmacist_ID == pharmacist_id).first()
    db_pharmacist.Pharmacist_ID = pharmacist.Pharmacist_ID
    db_pharmacist.FirstName = pharmacist.FirstName
    db_pharmacist.MiddleInit = pharmacist.MiddleInit
    db_pharmacist.LastName = pharmacist.LastName
    db_pharmacist.Pharmacist_Pharmacy_ID = pharmacist.Pharmacist_Pharmacy_ID
    db.commit()
    db.refresh(db_pharmacist)
    return db_pharmacist


# special statements ---------------------------------------------------------------------------------

#retrieve all the patients for a specific doctor given the foreign key for the doctor in the patient table
def get_patients_for_doctor(db: Session, doctor_id: int):
    #return all patients for a specific doctor
    # return db.query(models.Patient).filter(models.Patient.Doctor_Doctor_ID == doctor_id).all()
    return db.query(models.Patient).filter(models.Patient.Doctor_Doctor_ID == doctor_id).all();

#retrieve all pharmaciews that have a given Medication_ID where the stock is greater than 0
def get_pharmacies_with_stock(db: Session, medication_id: int):
    #return all pharmacies that have stock of a given medication with a stock greater than 0
    return db.query(models.Pharmacy).join(models.Stock).filter(models.Stock.Stock_ID == medication_id).filter(models.Stock.Stock > 0).all()
#retrieve all pharmacists who work at a given pharmacy
def get_pharmacists_for_pharmacy(db: Session, pharmacy_id: int):
    return db.query(models.Pharmacist).filter(models.Pharmacist.Pharmacist_Pharmacy_ID == pharmacy_id).all()

#retrieve all patients who have a prescription that has a specific phamacist_id
def get_patients_for_pharmacist(db: Session, pharmacist_id: int):
    #select patients form prescriptions with specific pharmacist_id
    return db.query(models.Patient).filter(models.Patient.Patient_ID == models.Prescription.Patient_Patient_ID).filter(models.Prescription.Pharmacist_Pharmacist_ID == pharmacist_id).all()
    
#retrieve all prescriptions related to a given patientID
def get_prescriptions_for_patient(db: Session, patient_id: int):
    return db.query(models.Prescription).filter(models.Prescription.Patient_Patient_ID == patient_id).all()

#retieve all prescriptions related to a given pharmacistID
def get_prescriptions_for_pharmacist(db: Session, pharmacist_id: int):
    return db.query(models.Prescription).filter(models.Prescription.Pharmacist_Pharmacist_ID == pharmacist_id).all()

# All the get statements --------------------------------------------------------------------------------- 
#retrieve all medications
def get_all_medications(db: Session):
    return db.query(models.Medication).all()

#retrieve all pharmacies
def get_all_pharmacies(db: Session):
    return db.query(models.Pharmacy).all()

#retrieve all doctors
def get_all_doctors(db: Session):
    return db.query(models.Doctor).all()

#retrieve all patients
def get_all_patients(db: Session):
    return db.query(models.Patient).all()

#retrieve all prescriptions
def get_all_prescriptions(db: Session):
    return db.query(models.Prescription).all()


#return db.query(models.Prescription).filter(models.Prescription.Patient_Patient_ID == patient_id and models.Prescription.Pharmacist_Pharmacist_ID == pharmacist_id).first()