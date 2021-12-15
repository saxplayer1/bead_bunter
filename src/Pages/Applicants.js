import React, {useState} from "react";
import "./Applicants.css"

export default function Applicants() {
    function addRow() {
        let table = document.getElementById("exp_table");

        let rowCount = table.rows.length;
        let row = table.insertRow(rowCount);

        let cell1 = row.insertCell(0);
        let element1 = document.createElement("input");
        element1.type = "text";
        cell1.appendChild(element1)

        let cell2 = row.insertCell(1);
        let element2 = document.createElement("input");
        element2.type = "number";
        cell2.appendChild(element2)
    }

    async function createApplicant() {
        if (!passport || passport.length !== 10) {
            alert("please enter valid passport number")
            return;
        }
        if (!name || !surname) {
            alert("please enter valid name and surname")
            return;
        }
        if (!phone || phone.length !== 10) {
            alert("please enter valid phone number")
            return;
        }
        if (email && !email.match("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$")) {
            alert("please enter valid email")
            return;
        }
        const url = "http://localhost:8080/applicants?name=" + name
            + "&surname=" + surname
            + "&email=" + email
            + "&phone_number=" + phone
            + "&passport_number=" + passport;
        if (passport && name && surname && phone && phone.length === 10) {
            const response = await fetch(url, {method: "POST"})
        }

        let spec_url = "http://localhost:8080/specs"
        let specsTable = document.getElementById("exp_table")
        let specs = "";
        let years = "";
        for (let r = 0; r < specsTable.rows.length; r++) {
            specs += specsTable.rows[r].cells[0] + ",";
            years += specsTable.rows[r].cells[1] + ",";
        }
        if (passport && passport.length === 10) {
            spec_url += "?specs=" + specs + "&years=" + years + "&passport=" + passport;
        }
        await fetch(spec_url, {method: "POST"})
    }

    async function alterApplicant() {
        if (!passport || passport.length !== 10) {
            alert("please enter valid passport number")
            return;
        }
        if (!name || !surname) {
            alert("please enter valid name and surname")
            return;
        }
        if (!phone || phone.length !== 10) {
            alert("please enter valid phone number")
            return;
        }
        if (email && !email.match("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$")) {
            alert("please enter valid email")
            return;
        }
        const url = "http://localhost:8080/applicants/alter?name=" + name
            + "&surname=" + surname
            + "&email=" + email
            + "&phone_number=" + phone
            + "&passport_number=" + passport;
        if (passport && name && surname && phone && phone.length === 10) {
            const response = await fetch(url, {method: "POST"})
        }

        let spec_url = "http://localhost:8080/specs"
        let specsTable = document.getElementById("exp_table")
        let specs = "";
        let years = "";
        for (let r = 0; r < specsTable.rows.length; r++) {
            console.log(specsTable.rows[r].cells[0])
            console.log(specsTable.rows[r].cells[1])
            // specs += specsTable.rows[r].cells[0] + ",";
            // years += specsTable.rows[r].cells[1] + ",";
        }
        if (passport && passport.length === 10) {
            console.log("string built")
            spec_url += "?specs=" + specs + "&years=" + years + "&passport=" + passport;
            await fetch(spec_url, {method: "POST"})
        }
    }

    function deleteApplicant() {
        fetch("http://localhost:8080/applicants/delete?passport=" + passport, {method: "POST"})
        fetch("HTTP://localhost:8080/applicants",)
            .then(response => response.text())
            .then(result => {
                setApplicants(JSON.parse(result).values);
                setLoading(false)
            })
            .catch(error => console.log('error', error));
    }

    function getJobs() {
        fetch("HTTP://localhost:8080/applicants/jobs?passport_number=" + passport)
            .then(response => response.text())
            .then(result => {
                setJobs(JSON.parse(result).values);
                setLoading(false)
            })
            .catch(error => console.log('error', error));
    }

    function handleSubmit() {
        submit === "create" ?
            createApplicant() :
            alterApplicant();
    }

    function clearForm() {
        setPassport("")
        setName("")
        setSurname("")
        setEmail("")
        setPhone("")
        setSubmit("create")
    }

    const [passport, setPassport] = useState(null);
    const [name, setName] = useState("")
    const [surname, setSurname] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [loading, setLoading] = useState(true);
    const [applicants, setApplicants] = useState([]);
    const [submit, setSubmit] = useState("create")
    const [jobs, setJobs] = useState([]);
    if (loading) {
        fetch("HTTP://localhost:8080/applicants",)
            .then(response => response.text())
            .then(result => {
                setApplicants(JSON.parse(result).values);
                setLoading(false)
            })
            .catch(error => console.log('error', error));
    }
    return (
        <div className={"applicantsPage"}>
            {applicants !== null ?

                <div>
                    <table className={"applicantsTable"}>
                        {applicants.map((applicant) => {
                            return (
                                <tr onClick={() => {
                                    console.log(applicant.passport_number)
                                    setPassport(applicant.passport_number)
                                    setName(applicant.name)
                                    setSurname(applicant.surname)
                                    setEmail(applicant.email)
                                    setPhone(applicant.phone_number)
                                    setSubmit("alter")
                                    setJobs([])
                                }
                                }>
                                    <div className={"tableEntry"}>
                                        <div className={"tableEntryColumn"}>
                                            <h2>
                                                {applicant.name} {applicant.surname}
                                            </h2>
                                        </div>
                                        <div className={"tableEntryColumn"}>
                                            <h2>Email:</h2>
                                            <p>
                                                {applicant.email}
                                            </p>
                                        </div>
                                        <div className={"tableEntryColumn"}>
                                            <h2>
                                                Phone Number:
                                            </h2>
                                            <p>
                                                {applicant.phone_number}
                                            </p>
                                        </div>
                                    </div>
                                </tr>
                            )
                        })}
                    </table>

                    <div>
                        {jobs.length != 0 ?
                            <>
                                <h2>
                                    Подходящие вакансии для {name} {surname}:
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
                </div> :
                <div/>}

            <form className={"applicantsForm"} onSubmit={handleSubmit}>
                <div className={"jobsFormInputs"}>
                    <label className={"jobsInput"}>
                        Имя:
                        <input type={"text"}
                               value={name}
                               onChange={e => setName(e.target.value)}/>
                    </label>
                    <label className={"applicantsInput"}>
                        Фамилия:
                        <input type={"text"}
                               value={surname}
                               onChange={e => setSurname(e.target.value)}/>
                    </label>
                    <label className={"applicantsInput"}>
                        Серия и номер паспорта:
                        <input type={"text"}
                               value={passport}
                               onChange={e => setPassport(e.target.value)}
                               maxLength={10}
                               minLength={10}/>
                    </label>
                    <label className={"applicantsInput"}>
                        Телефон:
                        <input type={"text"}
                               value={phone}
                               onChange={e => setPhone(e.target.value)}
                               maxLength={10}
                               minLength={10}/>
                    </label>
                    <label className={"applicantsInput"}>
                        Электронная почта
                        <input type={"text"}
                               value={email}
                               onChange={e => setEmail(e.target.value)}/>
                    </label>
                </div>
                <div>
                    <table id={"exp_table"}>
                        <tr>
                            <td>
                                Позиция
                            </td>
                            <td>
                                Опыт (полных лет)
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input type={"text"}/>
                            </td>
                            <td>
                                <input type={"number"}/>
                            </td>
                        </tr>
                    </table>
                    <input type={"button"} onClick={addRow} value={"+"}/>
                </div>
                <input type="button" value={"clear"} className={"applicantsButton"} onClick={clearForm}/>
                <input type="submit" value={submit} className={"applicantsButton"}/>
                <input type="button" value={"Get Jobs For Applicant"} className={"applicantsButton"} onClick={getJobs}/>
                <input type="button" value={"delete user"} className={"applicantsButton"} onClick={deleteApplicant}/>
            </form>
        </div>
    )
}