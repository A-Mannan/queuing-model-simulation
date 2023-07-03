import pandas as pd
import math
import numpy as np
from utils import (
    calculate_averages,
    get_service_time,
    get_inter_arrival_time,
    is_server_idle,
    find_server_index_with_min_time_left,
)
from arrival_table import construct_avg_arrival_lookup_table


NUM_OF_RECORDS = 10


def construct_simulation_table(
    num_of_servers,
    num_of_observations,
    arrival_dist_type,
    arrival_mean,
    service_dist_type,
    service_mean,
    arrival_variance=None,
    service_variance=None,
):
    servers = [[] for _ in range(num_of_servers)]
    df_avg_arrival_time_lookup = construct_avg_arrival_lookup_table(
        arrival_dist_type, arrival_mean, arrival_variance
    )
    df_simulation_table = pd.DataFrame(
        columns=[
            "arrival_random_num",
            "inter_arrival_time",
            "arrival_time",
            "service_random_num",
            "service_time",
            "start_time",
            "end_time",
            "turn_around_time",
            "wait_time",
        ]
    )

    for row_index in range(num_of_observations):
        df_simulation_table.loc[row_index, "arrival_random_num"] = np.random.rand()
        df_simulation_table.loc[row_index, "inter_arrival_time"] = (
            0
            if row_index == 0
            else get_inter_arrival_time(
                df_simulation_table.loc[row_index, "arrival_random_num"],
                df_avg_arrival_time_lookup,
            )
        )

        arrival_time = df_simulation_table.loc[row_index, "arrival_time"] = (
            0
            if row_index == 0
            else df_simulation_table.loc[row_index, "inter_arrival_time"]
            + df_simulation_table.loc[row_index - 1, "arrival_time"]
        )
        df_simulation_table.loc[row_index, "service_random_num"] = np.random.rand()
        service_time = df_simulation_table.loc[row_index, "service_time"] = math.ceil(
            get_service_time(service_dist_type, service_mean, service_variance)
        )
        for server_index, server in enumerate(servers):
            if is_server_idle(arrival_time, server):
                start_time = arrival_time
                end_time = arrival_time + service_time
                servers[server_index].append(
                    {
                        "id": row_index,
                        "start": start_time,
                        "end": end_time,
                    }
                )
                break
        else:
            min_time_server_index = find_server_index_with_min_time_left(servers)
            start_time = servers[min_time_server_index][-1]["end"]
            end_time = servers[min_time_server_index][-1]["end"] + service_time
            servers[min_time_server_index].append(
                {
                    "id": row_index,
                    "start": start_time,
                    "end": end_time,
                }
            )
        df_simulation_table.loc[row_index, "start_time"] = start_time
        df_simulation_table.loc[row_index, "end_time"] = end_time
        df_simulation_table.loc[row_index, "turn_around_time"] = end_time - arrival_time
        df_simulation_table.loc[row_index, "wait_time"] = start_time - arrival_time

    averages = calculate_averages(df_simulation_table, num_of_servers)

    return df_simulation_table, servers, averages


if __name__ == "__main__":
    print("#################################################################")
    print("##############  M/ M/ S Queuing Model Simulation  ###############")
    print("#################################################################")

    num_of_servers = 2  # int(input("Enter number of servers: "))
    arrival_mean = 2.15  # eval(input("Enter mean of arrival distribution: "))
    service_mean = 1.58  # eval(input("Enter mean of service distribution: "))
    arrival_type = 0
    service_type = 0

    servers = [[] for _ in range(num_of_servers)]

    df_avg_arrival_time_lookup = construct_avg_arrival_lookup_table(
        arrival_dist_type=arrival_type, arrival_mean=arrival_mean
    )
    print("=================================================================")
    print("Step 01 => Construction of Inter Arrival Table Lookup :")
    print(df_avg_arrival_time_lookup)

    # constructing complete simulation table
    df_simulation_table, servers, averages = construct_simulation_table(
        num_of_servers=num_of_servers,
        num_of_observations=10,
        arrival_dist_type=arrival_type,
        arrival_mean=arrival_mean,
        service_dist_type=service_type,
        service_mean=service_mean,
        service_variance=10,
    )
    print("=================================================================")
    print("Step 02 => Construction of complete Simulation Table :")
    print(df_simulation_table)

    print("=================================================================")
    print("Step 03 => Finding averages and utilization factor :")
    for item in averages:
        print(item["name"], item["value"])
