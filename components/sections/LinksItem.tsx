import { IProject } from '../../types/app/Iproject';
import Link from 'next/link';
import  Box  from '@mui/material/Box';

interface ILinkItem {
  slug: IProject['slug'];
  links: IProject['links'];
}

//render deployment and git icons and 

// return all links for github and deployment as well as link for THAT page;
const LinksItem = ({slug, links}:ILinkItem) => {
  return (
    <Box>
        <Link href={`/projects/${slug}`}>TO THIS PROJECT</Link>
        {links?.map((link)=>{
            return(
                <Link target="_blank"  rel="noopener noreferrer" key={link} href={link}>eternal Link</Link>
            )
        })}
    </Box>
  );
};

export default LinksItem;
