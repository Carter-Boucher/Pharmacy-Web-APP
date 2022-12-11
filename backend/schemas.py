from pydantic import BaseModel
import typing

class Config:
    orm_mode = True

class Pharmacy(BaseModel):
    Pharm_ID: int
    Name: str
    City: str
    State: str
    Country: str
    class Config:
        orm_mode = True
        
class PharmacyCreate(BaseModel):
    Pharm_ID: int
    Name: str
    City: str
    State: str
    Country: str
    class Config:
        orm_mode = True

class Stock(BaseModel):
    Stock_Key: int
    Stock_ID: int
    Stock: int
    DateUntilNextShipment: str
    Pharm_Pharm_ID: typing.Optional[int] = None
    class Config:
        orm_mode = True

class Manufacturer(BaseModel):
    Manu_Name: str
    Manu_Type: str
    AddressState: str
    AddressCity: str
    AddressStreet: str
    City: str
    State: str
    Country: str
    class Config:
        orm_mode = True

class Medication(BaseModel):
    Med_ID: int
    Med_Name: str
    Manu_Dosage: str
    class Config:
        orm_mode = True

class Patient(BaseModel):
    Patient_ID: int
    FirstName: str
    MiddleInit: str
    LastName: str
    Street: str
    City: str
    State: str
    DOB: str
    Age: int
    Sex: str
    Doctor_Doctor_ID: typing.Optional[int] = None
    class Config:
        orm_mode = True
# class PatientCreate(BaseModel):
#     Patient_ID: int
#     FirstName: str
#     MiddleInit: str
#     LastName: str
#     Street: str
#     City: str
#     State: str
#     DOB: str
#     Age: int

class Doctor(BaseModel):
    Doctor_ID: int
    FirstName: str
    MiddleInit: str
    LastName: str
    OfficeAddress: str
    class Config:
        orm_mode = True

class Pharmacist(BaseModel):
    Pharmacist_ID: int
    FirstName: str
    MiddleInit: str
    LastName: str
    Pharmacist_Pharmacy_ID: typing.Optional[int] = None
    class Config:
        orm_mode = True

class Prescription(BaseModel):
    Doctor_Doc_ID: typing.Optional[int] = None
    Patient_Patient_ID: typing.Optional[int] = None
    Medication_Med_ID: typing.Optional[int] = None
    Pharmacist_Pharmacist_ID: typing.Optional[int] = None
    Prescription_ID: int
    Date: str
    DosageTime: str
    DosageAmount: str
    Refillable: int
    class Config:
        orm_mode = True


    #     Pharmacist_Pharmacist_ID = prescription.Pharmacist_Pharmacist_ID,
    #     Prescription_ID = prescription.Prescription_ID,
    #     DosageTime = prescription.DosageTime,
    #     DosageAmount = prescription.DosageAmount,
    #     Refillable = prescription.Refillable