const express = require('express')
const Employee = require('../models/emp.model')
require('dotenv').config()
const empRoutes = express.Router()

// post
empRoutes.post('/',async(req,res) => {
    try {
        const newUser = new Employee(req.body)
        const savedUser = await newUser.save()
        res.status(201).json(savedUser)
    } catch (error) {
        res.status(500).json({message:'Internal server error'})
    }
})

// get
empRoutes.get('/',async(req,res) => {
    try {
        const {page=1, limit=5, sort='asc', search='',department} = req.query

        const filter = {}
        if(search){
            filter.firstName = {$regex: search, $options: 'i'}
        }

        if(department){
            filter.department = department
        }
        
        const sortOptions = {}
        if(sort==='asc' || sort==='desc'){
            sortOptions.salary = sort === 'asc' ? 1 : -1
        }

        const employees = await Employee.find(filter).sort(sortOptions).skip((page-1)*limit).limit(parseInt(limit,10))

        res.status(200).json({employees})

    } catch (error) {
        res.status(500).json({message:'Internal server error'})
    }
})

// update
empRoutes.put('/:id',async(req,res) => {
    try {
        const updatedEmp = await Employee.findByIdAndUpdate(req.params.id, req.body)
        if(!updatedEmp) 
        return res.status(404).json({message : 'Employee not found'})

        res.status(200).json({message: 'Employee updated',updatedEmp})
    } catch (error) {
        res.status(500).json({message:'Internal server error'})
    }
})

// delete
empRoutes.delete('/:id',async(req,res) => {
    try {
        const deletedEmp = await Employee.findByIdAndDelete(req.params.id)
        if(!deletedEmp) 
        return res.status(404).json({message : 'Employee not found'})

        res.status(204).json({message: 'Employee deleted'})
    } catch (error) {
        res.status(500).json({message:'Internal server error'})
    }
})

module.exports = empRoutes