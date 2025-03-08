import { omit, path, pick } from 'ramda';

export function transformData(data) {
  return data.filter(filterOrganization)
    .map(buildRecruitmentData)
    .map(pickCity);
}

function filterOrganization(item) {
  return item.organizationType === 'Sportegyesület';
}

function buildRecruitmentData(data) {
  const recruitmentKeys = Object.keys(data).filter(key => key.startsWith('recruitment'));
  const recruitments = pick(recruitmentKeys, data);
  const convertedRecruitments = convertLinks(recruitments);
  return {
    ...omit(recruitmentKeys, data),
    recruitment: {
      ...convertedRecruitments,
    },
  };
}

function pickCity(data) {
  return {
    ...data,
    city: path(['organizationAddresses', 'headquarter', 'city'], data) || '',
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
