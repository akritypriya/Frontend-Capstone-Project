import { useEffect, useState } from 'react'
import { createJob } from '../services'
import { useParams } from 'react-router-dom'
import { getJobById, updateJob } from '../services'
export default function NewJob() {
    const [isEdit, setIsEdit] = useState(false)
    const { id } = useParams()
    useEffect(() => {
        if (id) {
            setIsEdit(true)
        }
    }, [id])
    const [jobformData, setJobformData] = useState({
        companyName: '',
        logoUrl:'',
        jobPosition: '',
        salary: '',
        jobType: '',
        remoteOffice:'',
        location:'',
        jobDescription:'',
        companyDescription:'',
        skills:'',
        information:'',

    })
    useEffect(() => {
        if (isEdit && id) {
            const fetchJob = async () => {
                const res = await getJobById(id)
                if (res.status === 200) {
                    const data = await res.json()
                    //setting the data
                    setJobformData(data)
                }
                else {
                    console.log(res)
                }
            }
            fetchJob()
        }
    }, [isEdit, id])
    const handleCreateJob = async (e) => {
        e.preventDefault()
        const res = isEdit ? await updateJob(id, jobformData) : await createJob(jobformData)
        if (res.status === 200) {
            const data = await res.json()
            console.log(data)
            setJobformData({
                companyName: '',
        logoUrl:'',
        jobPosition: '',
        salary: '',
        jobType: '',
        remoteOffice:'',
        location:'',
        jobDescription:'',
        companyDescription:'',
        skills:'',
        information:'',
            })
            alert(`job ${isEdit ? 'updated' : 'created'} successfully`)
        }
        else if (res.status === 401) {
            alert('login to create job')
        }
        else {
            console.log(res)
            alert('error')
        }
    }
    return (
        <div>
            <h1>New Job</h1>
            <form onSubmit={handleCreateJob}>
                <input type="text" onChange={(e) => setJobformData({ ...jobformData, [e.target.name]: e.target.value })} value={jobformData.companyName} name="companyName" placeholder="enter company name" /><br />
                <input type="text" onChange={(e) => setJobformData({ ...jobformData, [e.target.name]: e.target.value })} value={jobformData.logoUrl} name="logoUrl" placeholder="logo of the company" /><br />
                <input type="text" onChange={(e) => setJobformData({ ...jobformData, [e.target.name]: e.target.value })} value={jobformData.jobPosition} name="jobPosition" placeholder="enter job position" /><br />
                <input type="number" onChange={(e) => setJobformData({ ...jobformData, [e.target.name]: e.target.value })} value={jobformData.salary} name="salary" placeholder="enter salary" /><br />
                <select onChange={(e) => setJobformData({ ...jobformData, [e.target.name]: e.target.value })} value={jobformData.jobType} name="jobType">
                    <option value="">select job type</option>
                    <option value="full-time">full-time</option>
                    <option value="part-time">part-time</option>
                    <option value="contract">contract</option>
                    <option value="internship">internship</option>
                    <option value="freelance">freelance</option>
                </select><br />
                <select onChange={(e) => setJobformData({ ...jobformData, [e.target.name]: e.target.value })} value={jobformData.remoteOffice} name="remoteOffice">
                    <option value="">select work preference</option>
                    <option value="work from home">work from home</option>
                    <option value="5-day-office">5-day-office</option>
                    <option value="hybrid">hybrid</option>
                </select><br />
                <input type="text" onChange={(e) => setJobformData({ ...jobformData, [e.target.name]: e.target.value })} value={jobformData.location} name="location" placeholder="enter job location" /><br />
                <input type="text" onChange={(e) => setJobformData({ ...jobformData, [e.target.name]: e.target.value })} value={jobformData.jobDescription} name="jobDescription" placeholder="enter job description" /><br />
                <input type="text" onChange={(e) => setJobformData({ ...jobformData, [e.target.name]: e.target.value })} value={jobformData.companyDescription} name="companyDescription" placeholder="enter company description" /><br />
                <input type="text" onChange={(e) => setJobformData({ ...jobformData, [e.target.name]: e.target.value })} value={jobformData.skills} name="skills" placeholder="enter skils required" /><br />
                <input type="text" onChange={(e) => setJobformData({ ...jobformData, [e.target.name]: e.target.value })} value={jobformData.information} name="information" placeholder="enter additional information required" /><br />

                <button type='submit'>{isEdit ? 'update' : 'create'}</button>
            </form>
        </div>
    )
}