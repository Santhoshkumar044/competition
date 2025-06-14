export class CompetitionService {
  constructor(models) {
    this.models = models;
  }

  async saveNewCompetitions(newCompetitions) {
    if (!newCompetitions || newCompetitions.length === 0) {
      console.log('No competitions provided to save.');
      return;
    }

    const Competition = this.models.Competition;

    const existingLinks = new Set(
      (await Competition.find({}, 'link')).map(c => c.link)
    );

    const operations = newCompetitions.map(comp => ({
      updateOne: {
        filter: { link: comp.link },
        update: { $set: comp },
        upsert: true
      }
    }));

    if (operations.length > 0) {
      const result = await Competition.bulkWrite(operations);
      console.log(`Database update results:
        - Inserted: ${result.upsertedCount}
        - Updated: ${result.modifiedCount}
        - Total processed: ${operations.length}`);
    } else {
      console.log('No new competitions to save.');
    }
  }
}