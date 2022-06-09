import { NAV_BAR_HEIGHT, NAV_BAR_PAGES } from "@fcastillo90/constants"
import Link from "next/link"
import { useRouter } from "next/router";
// import { NavLink } from "react-router-dom"

const LinkList = () => {
  const {pathname} = useRouter();
  
  return (
    <ul 
      style={{
        display: 'flex',
        alignItems: 'center',
        height: NAV_BAR_HEIGHT,
        margin: 0,
        padding: 0,
        listStyleType: 'none',
      }}
    >
      {NAV_BAR_PAGES.map((page) => (
        <li 
          key={page.label} 
          style={{
            float: "left",
            marginLeft: 18,
            fontSize: '0.85rem'
          }}
        >
          <Link 
            href={page.path} 
          >
            <a 
            style={
              {
                textDecoration: 'none', 
                color: '#e5e5e5', 
                ...pathname === page.path && {
                  color: 'white',
                  fontWeight: 700
                }
              }
            }>
              {page.label}
            </a>
          </Link>
        </li>
      ))}
    </ul>)
}

export default LinkList