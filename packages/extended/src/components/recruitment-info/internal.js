import { omit, pick } from 'ramda';

export function transformData(data) {
  return data
    .map(buildRecruitmentData)
    .map(pickSearchKeys)
    .sort(sortOrganizations);
}

function buildRecruitmentData(data) {
  const recruitmentKeys = Object.keys(data).filter(key => key.startsWith('recruitment') && key !== 'recruitmentName' && key !== 'recruitmentTeamName' && key !== 'recruitmentCity');

  const recruitments = pick(recruitmentKeys, data);
  const convertedRecruitments = convertLinks(recruitments);
  return {
    ...omit(recruitmentKeys, data),
    recruitment: {
      ...convertedRecruitments,
    },
  };
}

function pickSearchKeys(data) {
  return {
    ...data,
    recruitmentTeamName: data.recruitmentTeamName || '',
  };
}

function convertLinks(data) {
  data.recruitmentContactPhone = data.recruitmentContactPhone ? `<a href="tel:${data.recruitmentContactPhone}">${data.recruitmentContactPhone}</a>` : '';
  data.recruitmentContactEmail = data.recruitmentContactEmail ? `<a href="mailto:${data.recruitmentContactEmail}">${data.recruitmentContactEmail}</a>` : '';
  data.recruitmentContactUrl = handleURL(data.recruitmentContactUrl || '');
  return data;
}

function handleURL(url) {
  if (url.startsWith('http'))
    return `<a href="${url}" target="_blank">${url}</a>`;
  return `<a href="https://${url}" target="_blank">${url}</a>`;
}

function sortOrganizations(a, b) {
  const nameA = a.organizationName.toUpperCase();
  const nameB = b.organizationName.toUpperCase();
  if (nameA < nameB)
    return -1;
  if (nameA > nameB)
    return 1;
  return 0;
}
