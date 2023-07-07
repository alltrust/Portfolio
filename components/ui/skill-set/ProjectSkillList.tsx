import { useState } from 'react';
import useAppContext from '../../../hooks/useAppContext';
import { getMatchingProjectNamesAndLinks } from '../../../lib/getMatchingProjectNamesAndLinks';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListSubheader from '@mui/material/ListSubheader';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import FolderIcon from '@mui/icons-material/Folder';
import ListItemText from '@mui/material/ListItemText';
import NextLink from 'next/link';
import Box from '@mui/material/Box';
import GitHubIcon from '@mui/icons-material/GitHub';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import ArticleIcon from '@mui/icons-material/Article';

interface IOpenInitialState {
  id: string;
  isOpen: boolean;
}

const ProjectSkillList = () => {
  const initialOpenState: IOpenInitialState[] = [];

  const [open, setOpen] = useState<IOpenInitialState[]>(initialOpenState);
  const { state } = useAppContext();

  const { focusedTechSkill, projectNamesWithLinks } = state;

  let matchingProjectNameWithLinks;

  if (focusedTechSkill) {
    matchingProjectNameWithLinks = getMatchingProjectNamesAndLinks(
      projectNamesWithLinks,
      focusedTechSkill
    );
  }

  const handleOpenListItem = (event: React.MouseEvent<HTMLElement>) => {
    setOpen((prevState) => {
      const liIdx = prevState.findIndex((li) => {
        return li.id === event.currentTarget.id;
      });

      if (liIdx > -1) {
        const { isOpen, id } = prevState[liIdx];
        const updatedItem = { id, isOpen: !isOpen };

        return [
          ...prevState.slice(0, liIdx),
          updatedItem,
          ...prevState.slice(liIdx + 1),
        ];
      }

      return [...prevState, { id: event.currentTarget.id, isOpen: true }];
    });
  };

  return (
    <List
      subheader={
        <ListSubheader component="div">
          {matchingProjectNameWithLinks &&
          matchingProjectNameWithLinks.length > 0
            ? `Projects containing ${focusedTechSkill}`
            : 'No projects with this tech yet'}
        </ListSubheader>
      }
      sx={{ width: '100%' }}
    >
      <>
        {matchingProjectNameWithLinks && matchingProjectNameWithLinks.length > 0
          ? matchingProjectNameWithLinks.map((matches, idx) => {
              const foundLi = open.findIndex((li) => {
                return li.id === `li-${matches.name}-${idx}`;
              });

              return (
                <Box key={`${matches.name}-${idx}`}>
                  <ListItemButton
                    id={`li-${matches.name}-${idx}`}
                    onClick={handleOpenListItem}
                  >
                    <ListItemIcon>
                      <FolderIcon />
                    </ListItemIcon>
                    <ListItemText primary={matches.name} />
                    {foundLi > -1 && open[foundLi].isOpen ? (
                      <ExpandLess />
                    ) : (
                      <ExpandMore />
                    )}
                  </ListItemButton>
                  <Collapse
                    in={foundLi > -1 && open[foundLi].isOpen}
                    timeout="auto"
                    unmountOnExit
                  >
                    <List component="div" disablePadding>
                      <ListItemButton sx={{ pl: 4 }}>
                        <NextLink href={matches.links[0]}>
                          <GitHubIcon />
                          github
                        </NextLink>
                      </ListItemButton>
                      {matches.links[1] ? (
                        <ListItemButton sx={{ pl: 4 }}>
                          <NextLink href={matches.links[1]}>
                            <ArrowOutwardIcon />
                            Live Site
                          </NextLink>
                        </ListItemButton>
                      ) : null}
                      <ListItemButton sx={{ pl: 4 }}>
                        <NextLink href={matches.slug}>
                          <ArticleIcon />
                          Article
                        </NextLink>
                      </ListItemButton>
                    </List>
                  </Collapse>
                </Box>
              );
            })
          : null}
      </>
    </List>
  );
};

export default ProjectSkillList;
