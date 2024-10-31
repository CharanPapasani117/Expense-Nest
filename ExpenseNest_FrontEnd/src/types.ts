

export type Asset = {
    id: number,
    assetType: string,
    assetName: string,
    assetValue: number,
    assetDescription: string
}

export type Advisor = {
    advisorId: number,
    name: string,
    specialization: string,
    experience: number,
    qualification: string,
}

export type Appointment = {
    appintmentId:number,
    advisorName: string,
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    date: string,
    slot: string,
    type: string,
    incomeRange: string,
    savingsRange: string,
    goals: string,
}