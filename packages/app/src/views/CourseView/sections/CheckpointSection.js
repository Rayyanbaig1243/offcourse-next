import React from "react";
import PropTypes from "prop-types";
import { find, propEq } from "ramda";
import { Group } from "@offcourse/atoms";
import { Loading } from "@offcourse/molecules";
import { CheckpointCard } from "@offcourse/organisms";
import { ErrorCard, ResourceCard, ErrorBoundary } from "../../../components";
import { ResourceProvider } from "../../../providers";
import { errors as errorTypes } from "@offcourse/constants";

const { RESOURCE_NOT_LOADING, CHECKPOINT_NOT_FOUND } = errorTypes;

const CheckpointSection = ({ course, handlers, match, toggleCheckpoint }) => {
  const { task } = match.params;
  const { checkpoints } = course;
  const { goToCheckpoint, goToCourse } = handlers;
  const checkpoint = find(propEq("task", task), checkpoints);

  if (!course || course.status === "loading") {
    return <Loading />;
  }

  if (!checkpoint) {
    return <ErrorCard errorType={CHECKPOINT_NOT_FOUND} />;
  }
  const breadcrumbs = [
    {
      text: course.goal,
      onClick: () => goToCourse(course)
    }
  ];
  return (
    <Group overflow="hidden scroll">
      <CheckpointCard
        border="none"
        checkable={!!toggleCheckpoint}
        level={2}
        breadcrumbs={breadcrumbs}
        mb={[0, 6, 6]}
        checkpoint={{ course, ...checkpoint }}
        onCheckpointToggle={toggleCheckpoint}
        onCheckpointClick={goToCheckpoint}
        onCourseClick={goToCourse}
      />
      <ErrorBoundary
        key={task}
        componentToRender={() => <ErrorCard errorType={RESOURCE_NOT_LOADING} />}
      >
        <ResourceProvider resourceUrl={checkpoint.resourceUrl}>
          {({ resource }) => {
            return <ResourceCard resource={resource} />;
          }}
        </ResourceProvider>
      </ErrorBoundary>
    </Group>
  );
};

CheckpointSection.propTypes = {
  course: PropTypes.object.isRequired,
  toggleCheckpoint: PropTypes.func,
  handlers: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
};

export default CheckpointSection;
