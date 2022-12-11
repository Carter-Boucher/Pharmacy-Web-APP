from sqlalchemy import Table,Column,Integer,String,MetaData,ForeignKey,Date,Boolean
from config.db import meta

PHARMACY = Table(
    'PHARMACY', meta,
    Column('Pharm_ID', Integer, primary_key=True),
    Column('Name', String(255)),
    Column('City', String(255)),
    Column('State/Province', String(255)),
    Column('Country', String(255))
)

STOCK = Table(
    'STOCK', meta,
    Column('Medication_ID', Integer, primary_key=True),
    Column('Stock#', Integer),
    Column('DateUntilNextShipment', String(255)),
    Column('Pharm_Pharm_ID', None, ForeignKey('PHARMACY.Pharm_ID'))
)

MANUFACTURER = Table(
    'MANUFACTURER', meta,
    Column('Manu_Name', String(255), primary_key=True),
    Column('Manu_Type', String(255)),
    Column('AddressState/Province', String(255)),
    Column('AddressCity', String(255)),
    Column('AddressStreet', String(255)),
    Column('City', String(255)),
    Column('State/Province', String(255)),
    Column('Country', String(255))
)

MEDICATION = Table(
    'MEDICATION', meta,
    Column('Med_ID', Integer, primary_key=True),
    Column('Med_Name', String(255)),
    Column('Med_Type', String(255)),
    Column('Manu_Dosage', String(255)),
    Column('Patient_Patient_ID', None, ForeignKey('PATIENT.Patient_ID')),
    Column('Prescription_Prescription_ID', None, ForeignKey('PRESCRIPTION.Prescription_ID')),
    Column('Manu_Manu_Name', None, ForeignKey('MANUFACTURER.Manu_Name'))
)

PATIENT = Table(
    'PATIENT', meta,
    Column('Patient_ID', Integer, primary_key=True),
    Column('FirstName', String(255)),
    Column('MiddleInit', String(255)),
    Column('LastName', String(255)),
    Column('Street', String(255)),
    Column('City', String(255)),
    Column('State/Province', String(255)),
    Column('DOB', Date),
    Column('Age', Integer),
    Column('Sex', String(255)),
    Column('Doctor_Doctor_ID', None, ForeignKey('DOCTOR.Doctor_ID'))
)

DOCTOR = Table(
    'DOCTOR', meta,
    Column('Doctor_ID', Integer, primary_key=True),
    Column('FirstName', String(255)),
    Column('MiddleInit', String(255)),
    Column('LastName', String(255)),
    Column('OfficeAddress', String(255)),
)

PHARMACIST = Table(
    'PHARMACIST', meta,
    Column('Pharmacist_ID', Integer, primary_key=True),
    Column('FirstName', String(255)),
    Column('MiddleInit', String(255)),
    Column('LastName', String(255)),
    Column('Pharmacist_Pharmacist_ID', None, ForeignKey('PHARMACY.Pharm_ID'))
)

PRESCRIPTION = Table(
    'PRESCRIPTION', meta,
    Column('Doctor_Doc_ID', None, ForeignKey('DOCTOR.Doctor_ID')),
    Column('Patient_Patient_ID', None, ForeignKey('PATIENT.Patient_ID')),
    Column('Medication_Med_ID', None, ForeignKey('MEDICATION.Med_ID')),
    Column('Pharmacist_Pharmacist_ID', None, ForeignKey('PHARMACIST.Pharmacist_ID')),
    Column('Prescription_ID', Integer, primary_key=True),
    Column('Date', Date),
    Column('DosageTime', String(255)),
    Column('DosageAmount', String(255)),
    Column('Refillable', Boolean)
)

WRITES = Table(
    'WRITES', meta,
    Column('Doctor_Doc_ID', None, ForeignKey('DOCTOR.Doctor_ID')),
    Column('Patient_Patient_ID', None, ForeignKey('PATIENT.Patient_ID')),
    Column('Prescription_Prescription_ID', None, ForeignKey('PRESCRIPTION.Prescription_ID'))
)

OF = Table(
    'OF', meta,
    Column('Stock_Medication_ID', None, ForeignKey('STOCK.Medication_ID')),
    Column('Medication_Med_ID', None, ForeignKey('MEDICATION.Med_ID'))
)