import { BASEURL } from '../baseUrl';

export function getAvatarLink(link: string | undefined) {
  return link ? `${BASEURL}resources/${link}` : '/profile.png';
}
