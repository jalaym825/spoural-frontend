import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Global from '../../Utils/Global';
import { toast } from 'sonner';

const Inbox = () => {
  const [page, setPage] = React.useState(1);
  const [tickets, setTickets] = React.useState([]);
  useEffect(() => {
    Global.httpGet('/tickets', true, { page, limit: 10 }).then(res => {
      setTickets(res.data.tickets)
    }).catch(e => {
      toast.error("Something went wrong");
    })
  }, [])

  return (
    <>
      {
        tickets.length > 0 &&
        tickets.map((ticket) => {
          return (
            <div key={ticket.sis_id}>
              <h1>
                <Link to={ticket.sis_id}>
                  title: {ticket.title}
                </Link>
              </h1>
              email: {ticket.userEmail}
              <br />
              name: {ticket.userName}
              <hr />
            </div>
          )
        })
      }
    </>
  )
}

export default Inbox