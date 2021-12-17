import React, {useState} from "react";
import "./Employers.css"
export default function Employers() {
    const [name, setName] = useState("")
    const [address, setAddress] = useState("")
    const [phone, setPhone] = useState("")
    const [loading, setLoading] = useState(true);
    const [companies, setCompanies] = useState([]);
    const [submit, setSubmit] = useState("create")
    const [website, setWebsite] = useState([]);
    const [jobs, setJobs] = useState([]);
    if (loading) {
        fetch("HTTP://localhost:8080/employers",)
            .then(response => response.text())
            .then(result => {
                setCompanies(JSON.parse(result).values);
                setLoading(false)
            })
            .catch(error => console.log('error', error));
    }

    function clearForm() {
        setName("");
        setAddress("");
        setPhone("");
        setWebsite("")
    }

    function handleSubmit() {
        submit === "create" ?
            createEmployer() :
            alterEmployer();
    }

    async function createEmployer() {
        if(!name) {
            alert("enter valid company name")
            return
        }
        if(!address) {
            alert("address")
            return
        }
        if (!phone || phone.length !== 10) {
            alert("please enter valid phone number")
            return;
        }
        if (!website.match("^[\\w-\\.]+\\.)+[\\w-]{2,4}$")) {
            alert("please enter valid website or don't enter at all")
            return;
        }
        const url = "http://localhost:8080/employers?company_name=" + name
            + "&address=" + address
            + "&phone_number=" + phone
            + "&website=" + website;
        const response = await fetch(url, {method: "POST"})
    }
    async function alterEmployer() {
        if(!name) {
            alert("enter valid company name")
            return
        }
        if(!address) {
            alert("address")
            return
        }
        if (!phone || phone.length !== 10) {
            alert("please enter valid phone number")
            return;
        }
        if (!website.match("[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&=]*)")) {
            alert("please enter valid website or don't enter at all")
            return;
        }
        const url = "http://localhost:8080/employers/alter?company_name=" + name
            + "&address=" + address
            + "&phone_number=" + phone
            + "&website=" + website;
        const response = await fetch(url, {method: "POST"})
    }

    function deleteEmployer() {
        fetch("http://localhost:8080/employers/delete?company_name=" + name, {method: "POST"})
        fetch("HTTP://localhost:8080/employers",)
            .then(response => response.text())
            .then(result => {
                setCompanies(JSON.parse(result).values);
                setLoading(false)
            })
            .catch(error => console.log('error', error));
    }

    async function getJobsForEmployer() {
        fetch("http://localhost:8080/employers/jobs?company_name=" + name)
            .then(response => response.text())
            .then(result => {
                setJobs(JSON.parse(result).values);
                setLoading(false)
            })
            .catch(error => console.log('error', error));
        console.log(name)
    }

    return(
        <div>
            {companies !== null ?

                <div className={"employersPage"}>
                    <table className={"applicantsTable"}>
                        {companies.map((company) => {
                            return (
                                <tr onClick={() => {
                                    setName(company.company_name);
                                    setAddress(company.address);
                                    setPhone(company.phone_number);
                                    setWebsite(company.website)
                                    setSubmit("alter")
                                }
                                }>
                                    <div className={"employersTableEntry"}>
                                        <div className={"tableEntryColumn"}>
                                            <h2>
                                                {company.company_name}
                                            </h2>
                                        </div>
                                        <div className={"tableEntryColumn"}>
                                            <h2>Address:</h2>
                                            <p>
                                                {company.address}
                                            </p>
                                        </div>
                                        <div className={"tableEntryColumn"}>
                                            <h2>
                                                Phone Number:
                                            </h2>
                                            <p>
                                                +7 {company.phone_number}
                                            </p>
                                        </div>
                                        <div className={"tableEntryColumn"}>
                                            <h2>
                                                Website:
                                            </h2>
                                            <p>
                                                {company.website}
                                            </p>
                                        </div>
                                    </div>
                                </tr>
                            )
                        })}
                    </table>
                    <form className={"applicantsForm"} onSubmit={handleSubmit}>
                        <div className={"jobsFormInputs"}>
                            <label className={"jobsInput"}>
                                Название компании:
                                <input type={"text"}
                                       value={name}
                                       onChange={e => setName(e.target.value)}/>
                            </label>
                            <label className={"applicantsInput"}>
                                Адрес
                                <input type={"text"}
                                       value={address}
                                       onChange={e => setAddress(e.target.value)}/>
                            </label>
                            <label className={"applicantsInput"}>
                                Телефон (последние 10 цифр):
                                <div>
                                    <input type={"text"}
                                           value={phone}
                                           onChange={e => setPhone(e.target.value)}
                                           maxLength={10}
                                           minLength={10}/>
                                </div>
                            </label>
                            <label className={"applicantsInput"}>
                                Сайт
                                <input type={"text"}
                                       value={website}
                                       onChange={e => setWebsite(e.target.value)}/>
                            </label>
                        </div>
                        <input type="button" value={"clear"} className={"applicantsButton"} onClick={clearForm}/>
                        <input type="submit" value={submit} className={"applicantsButton"}/>
                        <input type="button" value={"get jobs by company"} className={"applicantsButton"} onClick={getJobsForEmployer}/>
                        <input type="button" value={"delete chosen employer"} className={"deleteButton"} onClick={deleteEmployer}/>
                    </form>
                </div> :
                <div/>}
            <div>
                {jobs.length !== 0 ?
                    <>
                        <h2>
                            Вакансии от компании {name}:
                        </h2>
                        <table className={"jobsTable"}>
                            {jobs.map((job) => {
                                return (
                                    <tr>
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
                        </table>
                    </> :
                    <div/>}
            </div>
        </div>
    )
}