import React, {useState} from "react";
import "./Jobs.css"


export default function Jobs() {

    async function createJob() {
        if (exp > 80) {
            alert("nobody works that long");
            return;
        }
        if (companies.indexOf(company) === -1) {
            alert("This company is not registered")
        } else {
            const url = "http://localhost:8080/jobs?position=" + position
                + "&req_exp=" + exp
                + "&salary=" + salary
                + "&company_name=" + company;
            const response = await fetch(url, {method: "POST"})
        }
    }

    async function alterJob() {

        if (exp > 80) {
            alert("nobody works that long");
            return;
        }
        if (companies.indexOf(company) === -1) {
            alert("This company is not registered")
        } else {
            const url = "http://localhost:8080/jobs/alter?position=" + position
                + "&req_exp=" + exp
                + "&salary=" + salary
                + "&company_name=" + company
                + "&id=" + jobId;
            const response = await fetch(url, {method: "POST"})
        }
    }

    async function deleteJob() {
        fetch("http://localhost:8080/jobs/delete?id=" + jobId, {method: "POST"})
        clearForm();
        let compTemp = [];
        fetch("HTTP://localhost:8080/jobs",)
            .then(response => response.text())
            .then(result => {
                setJobs(JSON.parse(result).values);
            })
            .catch(error => console.log('error', error));

        fetch("HTTP://localhost:8080/employers/names",)
            .then(response => response.text())
            .then(result => {
                JSON.parse(result).values.map((company) => {
                    compTemp.push(company.company_name)
                });
                setCompanies(compTemp);
                setLoading(false)
            })
            .catch(error => console.log('error', error));
    }

    function handleSubmit() {
        submit === "create" ?
            createJob() :
            alterJob();
    }

    function clearForm() {
        setPosition("")
        setJobId("")
        setCompany("")
        setSalary("")
        setExp("")
        setSubmit("create")
    }

    const [jobs, setJobs] = useState(null);
    const [loading, setLoading] = useState(true);
    const [position, setPosition] = useState("");
    const [exp, setExp] = useState();
    const [salary, setSalary] = useState();
    const [company, setCompany] = useState("");
    const [jobId, setJobId] = useState(1);
    const [submit, setSubmit] = useState("create");
    const [companies, setCompanies] = useState([]);
    if (loading) {
        let compTemp = [];
        fetch("HTTP://localhost:8080/jobs",)
            .then(response => response.text())
            .then(result => {
                setJobs(JSON.parse(result).values);
            })
            .catch(error => console.log('error', error));

        fetch("HTTP://localhost:8080/employers/names",)
            .then(response => response.text())
            .then(result => {
                JSON.parse(result).values.map((company) => {
                    compTemp.push(company.company_name)
                });
                setCompanies(compTemp);
                setLoading(false)
            })
            .catch(error => console.log('error', error));
        console.log(companies)
    }

    return (
        <div className={"jobsPage"}>
            {jobs !== null ?
                <table className={"jobsTable"}>
                    {jobs.map((job) => {
                        return (
                            <tr onClick={() => {
                                setPosition(job.position);
                                setExp(job.req_exp);
                                setSalary(job.salary);
                                setCompany(job.company_name);
                                setJobId(job.id)
                                setSubmit("alter")
                            }
                            }>
                                <div className={"jobsTableEntry"}>
                                    <div className={"tableEntryColumn"}>
                                        <h2>
                                            {job.position}
                                        </h2>
                                        <p>
                                            {job.company_name}
                                        </p>
                                    </div>
                                    <div className={"tableEntryColumn"}>
                                        {job.req_exp == 0 ?
                                            <h2>Опыт не требуется</h2> :
                                            <h2> Требуемый опыт: {job.req_exp} </h2>
                                        }
                                    </div>
                                    <div className={"tableEntryColumn"}>
                                        <h2>
                                            З/П
                                        </h2>
                                        <p>
                                            {job.salary}
                                        </p>
                                    </div>
                                </div>
                            </tr>
                        )
                    })}
                </table> :
                <div/>}

            <form className={"jobsForm"} onSubmit={handleSubmit}>
                <div className={"jobsFormInputs"}>
                    <label className={"jobsInput"}>
                        Вакансия:
                        <input type={"text"}
                               value={position}
                               onChange={e => setPosition(e.target.value)}/>
                    </label>
                    <label className={"jobsInput"}>
                        Необходимый опыт:
                        <input type={"number"}
                               value={exp}
                               onChange={e => setExp(e.target.value)}/>
                    </label>
                    <label className={"jobsInput"}>
                        Зарплата:
                        <input type={"number"}
                               value={salary}
                               onChange={e => setSalary(e.target.value)}/>
                    </label>
                    {!loading ?
                        <label className={"jobsInput"}>
                            Название компании:
                            <select
                                onChange={e => setCompany(e.target.value)}>
                                {companies.map((com) => {
                                    return <option value={com}>{com}</option>
                                })}
                            </select>
                        </label> :
                        <div/>
                    }
                </div>
                <input type="button" value={"clear"} className={"jobsButton"} onClick={clearForm}/>
                <input type="submit" value={submit} className={"jobsButton"}/>
                <input type="button" value={"delete job"} className={"deleteButton"} onClick={deleteJob}/>
            </form>
        </div>
    )
}