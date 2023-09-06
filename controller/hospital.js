import Hospital from '../model/Hospital.js';

export const createHospital = async(req,res,next)=>{
    try{
        const hospital = new Hospital(req.body);
        await hospital.save();
        res.status(201).json({
            status : "Success",
            data : hospital
        });
    }catch(err){
        next(err);
    }
};

export const getHospital = async(req,res,next)=>{
    const id = req.params.id;

    try {
        const hospital = await Hospital.findById(id);
        res.status(200).json(hospital);
    } catch (error) {
        next(error);
    }
}

export const getAllHospitals = async(req,res,next)=>{
    try {
        const hospitals = await Hospital.find();
        res.status(200).json(hospitals);
    } catch (error) {
        next(error);
    }
}

export const updateHospital = async(req,res,next)=>{
    const id = req.params.id;
    try {
        const updatedhospital = await Hospital.findByIdAndUpdate(
            id,
            {$set: req.body},
            {new: true}
        );
        res.status(201).json(updatedhospital);
    } catch (error) {
        next(error);
    }
};

export const deleteHospital = async(req,res,next)=>{
    const id = req.params.id;
    try {
        await Hospital.findByIdAndDelete(id);
        res.status(200).json("Hospital has been deleted");

    } catch (error) {
        next(error);
    }
}