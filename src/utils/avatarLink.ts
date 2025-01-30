export function getAvatarLink(link: string | undefined) {
  return link
    ? `https://ya-praktikum.tech/api/v2/resources/${link}`
    : '/profile.png';
}
