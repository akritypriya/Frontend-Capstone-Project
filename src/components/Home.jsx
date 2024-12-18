import { useState, useEffect } from 'react'
import { getJobs } from '../services'
import { useNavigate } from 'react-router-dom'
import { deleteJob } from '../services'
export default function Home() {
    const [jobs, setJobs] = useState([])
    const [loading, setLoading] = useState(true)
    const fetchJobs=async()=>{
        setLoading(true)
        const res=await getJobs()
        if(res.status===200){
            const data=await res.json()
            setJobs(data)
        }
        else{
            console.log(res)
        }
        setLoading(false)


    }
    useEffect(() => {
        const fetchJobs = async () => {
             setLoading(true)
            const res = await getJobs()
            if (res.status === 200) {
                const data = await res.json()
                setJobs(data)
            }
            else {
                console.log(res)
            }
             setLoading(false)
        }
        fetchJobs()
    }, [])
    const handleDeleteJob = async (id) => {
        try {
            const res = await deleteJob(id)
            if (res.status === 200) {
                const data = await res.json()
                console.log(data)
                alert('Job deleted successfully')
                fetchJobs()
            } else if (res.status === 401) {
                alert('You are not authorized to delete this job')
            } else {
                console.log(res)
                alert('Error deleting job')
            }
        } catch (error) {
            console.error('Delete job error', error)
            alert('Error deleting job')
        }
    }
    console.log(jobs)
    const navigate=useNavigate()

    return (
      <div>
      <h1>Home</h1>
      {loading ? <h1>loading...</h1> : jobs.map((job) => (
          <div key={job.id}>
              <h2>{job.companyName}</h2>
              <p>{job.jobPosition}</p>
              <p>{job.salary}</p>
              <p>{job.jobType}</p>
              <p>{job.location}</p>
              <p>{job.jobDescription}</p>
              <button onClick={()=>navigate(`/editJob/${job._id}`)}>edit</button>
              <button onClick={() => handleDeleteJob(job._id)}>Delete</button>
                                
          </div>
      ))}
  </div>
)
}
