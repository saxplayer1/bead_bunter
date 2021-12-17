import React, {useEffect, useState} from "react";
import "./Applicants.css"

export default function Applicants() {
    const [passport, setPassport] = useState(null);
    const [name, setName] = useState("")
    const [surname, setSurname] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [loading, setLoading] = useState(true);
    const [applicants, setApplicants] = useState([]);
    const [submit, setSubmit] = useState("create")
    const [jobs, setJobs] = useState([]);
    const [specs, setSpecs] = useState(new Map());
    const [tableVisible, setTableVisible] = useState(false);

    function addRow() {
        let table = document.getElementById("exp_table");

        if (table.rows[table.rows.length - 1].cells[0].firstChild.value
            && table.rows[table.rows.length - 1].cells[1].firstChild.value) {
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
    }

    function removeRow() {
        let table = document.getElementById("exp_table");
        table.deleteRow(table.rows.length - 2)
    }

    function clearTable() {
        let table = document.getElementById("exp_table")
        console.log(table.rows)
        for (let i = 0; i < table.rows.length - 2; i++) {
            removeRow();
        }
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
            specs += specsTable.rows[r].cells[0].firstChild.value + ",";
            years += specsTable.rows[r].cells[1].firstChild.value + ",";
        }
        console.log("string built")
        spec_url += "?specs=" + specs + "&years=" + years + "&passport=" + passport;
        await fetch(spec_url, {method: "POST"})
    }

    async function alterApplicant() {
        console.log("altering")
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
        for (let r = 1; r < specsTable.rows.length; r++) {
            specs += specsTable.rows[r].cells[0].firstChild.value + ",";
            years += specsTable.rows[r].cells[1].firstChild.value + ",";
        }
        console.log("string built")
        spec_url += "?specs=" + specs + "&years=" + years + "&passport=" + passport;
        await fetch(spec_url, {method: "POST"}).catch(e => console.log(e))
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
        fetch("HTTP://localhost:8080/specs/delete?passport=" + passport, {method: "POST"})
        clearForm();
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
        setTableVisible(false);
    }

    function changeSpecs() {
        setTableVisible(true);
        specs.get(passport).map((spec, index) => {
            const table = document.getElementById("exp_table");
            table.rows[index + 1].cells[0].firstChild.value = spec.position;
            table.rows[index + 1].cells[1].firstChild.value = spec.years_exp;
            addRow();
        })
    }

    // function getSpecs() {
    //     fetch("HTTP://localhost:8080/specs?passport=" + passport)
    //         .then(response => response.json())
    //         .then(async result => {
    //             setSpecs(result.values)
    //         })
    //         .catch(error => console.log('error', error));
    //
    //     specs.map((spec, index) => {
    //         addRow();
    //         const table = document.getElementById("exp_table");
    //         table.rows[index + 1].cells[0].firstChild.value = spec.position;
    //         table.rows[index + 1].cells[1].firstChild.value = spec.years_exp;
    //     })
    //
    //     console.log(specs)
    // }
    if (loading) {
        fetch("HTTP://localhost:8080/applicants",)
            .then(response => response.text())
            .then(result => {
                setApplicants(JSON.parse(result).values);
                setLoading(false)
            })
            .catch(error => console.log('error', error));

        fetch("HTTP://localhost:8080/specs/all")
            .then(response => response.json())
            .then(result => result.values)
            .then(data => {
                let specMap = new Map()
                data.map((spec) => {
                    if (!specMap.get(spec.passport_number)) {
                        specMap.set(spec.passport_number, []);
                    }
                    specMap.get(spec.passport_number).push(spec);
                })
                setSpecs(specMap)
            })
    }
    return (
        <div className={"applicantsPage"}>
            {applicants !== null ?

                <div>
                    <table className={"applicantsTable"}>
                        {applicants.map((applicant, index) => {
                            return (
                                <tr onClick={async () => {
                                    setLoading(true)
                                    setPassport(applicants[index].passport_number)
                                    setName(applicants[index].name)
                                    setSurname(applicants[index].surname)
                                    setEmail(applicants[index].email)
                                    setPhone(applicants[index].phone_number)
                                    setSubmit("alter")
                                    setLoading(false)
                                }
                                }>
                                    <div className={"applicantsTableEntry"}>
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
                                                +7 {applicant.phone_number}
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
                        Телефон (последние 10 цифр):
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
                    <div style={{display: tableVisible ? '' : 'none' }}>
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
                <input type="button" value={"Edit specializations"} className={"applicantsButton"} onClick={changeSpecs}/>
                <input type="button" value={"delete user"} className={"deleteButton"} onClick={deleteApplicant}/>
            </form>
        </div>
    )
}