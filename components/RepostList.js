import React from "react";
import { ReactionList, SectionHeader } from "expo-activity-feed";

import RepostItem from "./RepostItem";

/**
 * RepostList uses ReactionList under the hood to render a list of reposts.
 *
 * @example ./examples/RepostList.md
 */

// TODO: Convert to FC
export default class ReposttList extends React.PureComponent {
  render() {
    const { activityId, activityPath } = this.props;
    return (
      <ReactionList
        activityId={activityId}
        reactionKind={"repost"}
        Reaction={reaction => <RepostItem repost={reaction} />}
        activityPath={activityPath}
      >
        <SectionHeader>Reposts</SectionHeader>
      </ReactionList>
    );
  }
}
