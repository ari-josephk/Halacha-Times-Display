const { HDate } = require('@hebcal/core');

export const GET = async req => Response.json(new HDate(new Date(req.nextUrl.searchParams.get('date'))).toString());