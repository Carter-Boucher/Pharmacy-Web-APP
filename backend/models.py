from sqlalchemy import Table,Column,Integer,String,ForeignKey,Date,Boolean
from database import Base

class Pharmacy(Base):
    __tablename__ = 'PHARMACY'
    Pharm_ID = Column(Integer, primary_key=True)
    Name = Column(String(255))
    City = Column(String(255))
    State = Column(String(255))
    Country = Column(String(255))

class Stock(Base):
    __tablename__ = 'STOCK'
    Stock_Key = Column(Integer, primary_key=True)
    Stock_ID = Column(Integer)
    Stock = Column(Integer)
    DateUntilNextShipment = Column(String(255))
    Pharm_Pharm_ID = Column(Integer, ForeignKey('PHARMACY.Pharm_ID'))

class Manufacturer(Base):
    __tablename__ = 'MANUFACTURER'
    Manu_Name = Column(String(255), primary_key=True)
    Manu_Type = Column(String(255))
    AddressState = Column(String(255))
    AddressCity = Column(String(255))
    AddressStreet = Column(String(255))
    City = Column(String(255))
    State = Column(String(255))
    Country = Column(String(255))

class Medication(Base):
    __tablename__ = 'MEDICATION'
    Med_ID = Column(Integer, primary_key=True)
    Med_Name = Column(String(255))
    Manu_Dosage = Column(String(255))

class Patient(Base):
    __tablename__ = 'PATIENT'
    Patient_ID = Column(Integer, primary_key=True)
    FirstName = Column(String(255))
    MiddleInit = Column(String(255))
    LastName = Column(String(255))
    Street = Column(String(255))
    City = Column(String(255))
    State = Column(String(255))
    DOB = Column(String(255))
    Age = Column(Integer)
    Sex = Column(String(255))
    Doctor_Doctor_ID = Column(Integer, ForeignKey('DOCTOR.Doctor_ID'))

class Doctor(Base):
    __tablename__ = 'DOCTOR'
    Doctor_ID = Column(Integer, primary_key=True)
    FirstName = Column(String(255))
    MiddleInit = Column(String(255))
    LastName = Column(String(255))
    OfficeAddress = Column(String(255))

class Pharmacist(Base):
    __tablename__ = 'PHARMACIST'
    Pharmacist_ID = Column(Integer, primary_key=True)
    FirstName = Column(String(255))
    MiddleInit = Column(String(255))
    LastName = Column(String(255))
    Pharmacist_Pharmacy_ID = Column(Integer, ForeignKey('PHARMACY.Pharm_ID'))

class Prescription(Base):
    __tablename__ = 'PRESCRIPTION'
    Doctor_Doc_ID = Column(Integer, ForeignKey('DOCTOR.Doctor_ID'))
    Patient_Patient_ID = Column(Integer, ForeignKey('PATIENT.Patient_ID'))
    Medication_Med_ID = Column(Integer, ForeignKey('MEDICATION.Med_ID'))
    Pharmacist_Pharmacist_ID = Column(Integer, ForeignKey('PHARMACIST.Pharmacist_ID'))
    Prescription_ID = Column(Integer, primary_key=True)
    Date = Column(String(255))
    DosageTime = Column(String(255))
    DosageAmount = Column(String(255))
    Refillable = Column(Integer)

# class Writes(Base):
#     __tablename__ = 'WRITES'
#     Doctor_Doc_ID = Column(None, ForeignKey('DOCTOR.Doctor_ID'))
#     Patient_Patient_ID = Column(None, ForeignKey('PATIENT.Patient_ID'))
#     Prescription_Prescription_ID = Column(None, ForeignKey('PRESCRIPTION.Prescription_ID'))

# class Of(Base):
#     __tablename__ = 'OF'
#     Stock_Medication_ID = Column(None, ForeignKey('STOCK.Medication_ID'))
#     Medication_Med_ID = Column(None, ForeignKey('MEDICATION.Med_ID'))