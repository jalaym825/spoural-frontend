import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import {toast} from 'sonner';
import { useParams } from 'react-router-dom';
import Global from '../../Utils/Global';

const Ticket = () => {
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);

  const formik = useFormik({
    initialValues: {
      message: "",
    },
    onSubmit: async values => {
      values = await Object.assign(values);
      const tId = toast.loading("Sending response to...");
      Global.httpPost(`/tickets/`)
    }
  })

  useEffect(() => {
    Global.httpGet(`/tickets/${id}`).then(res => {
      setTicket(res.data.ticket);
    }).catch(e => {
      toast.error("Something went wrong");
    })
  }, [])

  return (
    <>
      {
        ticket &&
        <>
          {ticket.title}
          <br />
          {ticket.description}
          <br />
          <br />
          user details:
          <br />
          {ticket.userName}
          <br />
          {ticket.userEmail}
          <form>
            <label for="w3review">Review of W3Schools:</label>

            <textarea id="w3review" name="w3review" rows="4" cols="50">
              At w3schools.com you will learn how to make a website. They offer free tutorials in all web development technologies.
            </textarea>

            {/* <button onClick={sendResponse}>submit</button> */}

          </form>
          <hr />

        </>
      }
    </>
  )
}

export default Ticket