import { useState } from "react";
import { Button, Flex, FormControl, FormLabel, IconButton, Select, Text } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

export function Pagination({ config, start, onIndexChange, labelText, count, setPaginationConfig }) {
	const { perPage, options } = config;
	const [page, setPage] = useState(Math.floor(start / perPage) + 1);
	const totalPages = Math.ceil(count / perPage);

	const handlePerPageSelect = (e) => {
		const newPerPage = parseInt(e.target.value, 10);
		setPaginationConfig({ ...config, perPage: newPerPage });
		handlePageChange(1, newPerPage);
	}

	const handlePageChange = (nextPage, newPerPage = perPage) => {
		setPage(nextPage);
		const nextStart = (nextPage - 1) * newPerPage + 1;
		onIndexChange(nextStart, newPerPage);
	}

	// Check if we have props
	if (!config || start === undefined || count === undefined || !onIndexChange || !setPaginationConfig) {
		console.error("Make sure to add 'config', 'start', 'limit', 'count', 'onIndexChange' and 'setPaginationConfig' props to Pagination component");
		// console.log({config}, {start}, {count}, {onIndexChange}, {setPaginationConfig});
		return ('Pagination Setup Error');
	}

	const renderPageButtons = () => {
		const buttons = [];
		if (totalPages <= 5) {
			for (let i = 1; i <= totalPages; i++) {
				buttons.push(
					<Button
						key={`set-of-${i}`}
						aria-label={`Goto Page ${i}`}
						variant="outline"
						aria-current={page === i}
						fontWeight={page === i ? "bold" : "normal"}
						onClick={() => handlePageChange(i)}
						isDisabled={page === i}
					>
						{i}
					</Button>
				);
			}
		} else {
			buttons.push(
				<Button
					key={1}
					aria-label="Goto Page 1"
					variant="outline"
					aria-current={page === 1}
					fontWeight={page === 1 ? "bold" : "normal"}
					onClick={() => handlePageChange(1)}
					isDisabled={page === 1}
				>
					1
				</Button>
			);
			buttons.push(
				<Button
					key={2}
					aria-label="Goto Page 1"
					variant="outline"
					aria-current={page === 2}
					fontWeight={page === 2 ? "bold" : "normal"}
					onClick={() => handlePageChange(2)}
					isDisabled={page === 2}
				>
					2
				</Button>
			);
			if (page > 3) {
				buttons.push(<Text fontSize={"lg"} key="ellipsis"> ... </Text>);
			}
			if (page > 2 && page < totalPages - 1) {
				buttons.push(
					<Button
						key={page}
						aria-label={`Goto Page ${page}`}
						variant="outline"
						aria-current
						fontWeight={"bold"}
						isDisabled
						onClick={() => handlePageChange(page)}
					>
						{page}
					</Button>
				);
			}
			if (page < totalPages - 2) {
				buttons.push(<Text fontSize={"lg"} key="ellipsis2"> ... </Text>);
			}
			buttons.push(
				<Button
					key={totalPages - 1}
					aria-label={`Goto Page ${totalPages - 1}`}
					variant="outline"
					aria-current={page === totalPages - 1}
					fontWeight={page === totalPages - 1 ? "bold" : "normal"}
					onClick={() => handlePageChange(totalPages - 1)}
					isDisabled={page === totalPages - 1}
				>
					{totalPages - 1}
				</Button>
			);
			buttons.push(
				<Button
					key={totalPages}
					aria-label={`Goto Page ${totalPages}`}
					variant="outline"
					aria-current={page === totalPages}
					fontWeight={page === totalPages ? "bold" : "normal"}
					onClick={() => handlePageChange(totalPages)}
					isDisabled={page === totalPages}
				>
					{totalPages}
				</Button>
			);
		}
		return buttons;
	};

	return (
		<Flex
			as={'nav'}
			role="navigation"
			aria-label="Pagination Navigation"
			alignItems={"center"}
			gap={2}
		>
			<FormControl as={Flex} alignItems={"center"} justifyContent={"flex-end"}>
				{options?.length > 1 && (
					<>
						<FormLabel fontSize={"sm"} fontWeight={"normal"} mb={0}>{labelText || "Rows per Page"}:</FormLabel>
						<Select
							width={"85px"}
							name="perPage"
							value={perPage}
							onChange={handlePerPageSelect}
						>
							{options.map((value) => (
								<option key={value} value={value}>
									{value}
								</option>
							))}
						</Select>
					</>
				)}
			</FormControl>
			{count > perPage && (
				<>
					<IconButton
						isDisabled={page === 1}
						icon={<ChevronLeftIcon width={18} />}
						aria-label="Goto Previous page"
						title="Previous"
						variant="outline"
						onClick={() => handlePageChange(page - 1)}
					/>

					{renderPageButtons()}

					<IconButton
						isDisabled={page === totalPages || totalPages === 0}
						icon={<ChevronRightIcon width={18} />}
						aria-label="Goto Next page"
						title="Next"
						variant="outline"
						onClick={() => handlePageChange(page + 1)}
					/>
				</>
			)}
		</Flex>
	);
}