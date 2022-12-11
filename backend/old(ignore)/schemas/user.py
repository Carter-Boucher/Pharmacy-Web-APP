from pydantic import BaseModel

class pharmacy(BaseModel):
    id: int
    name: str
    city: str
    stateProvince: str
    country: str

class stock(BaseModel):
    id: int
    stockNumber: str
    dateUntilNextShipment: str
    pharmacyId: int

class manufacturer(BaseModel):
    id: int
    name: str
    country: str