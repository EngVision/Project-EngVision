import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Score, ScoreSchema } from './score.schema';

@Schema({ _id: false, versionKey: false })
export class ListeningLevel {
  @Prop({ type: ScoreSchema, default: null })
  comprehension: Score;

  @Prop({ type: ScoreSchema, default: null })
  overall: Score;
}

export const ListeningLevelSchema =
  SchemaFactory.createForClass(ListeningLevel);

ListeningLevelSchema.pre('save', function () {
  const num = [this.comprehension].filter(e => e !== null).length;

  if (this.comprehension) {
    if (this.overall === null) {
      this.overall = new Score();
    }

    this.overall.LevelA = this.comprehension.LevelA / num;
    this.overall.LevelB = this.comprehension.LevelB / num;
    this.overall.LevelC = this.comprehension.LevelC / num;
  }
});
